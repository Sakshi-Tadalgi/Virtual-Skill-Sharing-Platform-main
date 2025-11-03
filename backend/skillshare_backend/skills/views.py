from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Skill, SkillAnalytics
from .serializers import SkillSerializer, SkillAnalyticsSerializer


# ✅ List all skills or create a new one (authenticated users only)
class SkillListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Show only the logged-in user's skills
        return Skill.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ✅ Retrieve, Update, or Delete a specific skill (owner only)
class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only access their own skills
        return Skill.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        skill = self.get_object()
        if skill.user != self.request.user:
            raise PermissionDenied("You do not have permission to modify this skill.")
        serializer.save()


# ✅ Retrieve Analytics for a specific skill
class SkillAnalyticsView(generics.RetrieveAPIView):
    serializer_class = SkillAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure user can only view analytics of their own skills
        return SkillAnalytics.objects.filter(skill__user=self.request.user)
