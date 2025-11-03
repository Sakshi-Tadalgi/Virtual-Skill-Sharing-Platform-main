from rest_framework import serializers
from .models import Skill, SkillAnalytics


class SkillSerializer(serializers.ModelSerializer):
    # Optional: show username instead of user ID
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'user', 'title', 'description', 'category', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class SkillAnalyticsSerializer(serializers.ModelSerializer):
    # Optional: include related skill title
    skill = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SkillAnalytics
        fields = ['skill', 'learners_count', 'average_rating']
