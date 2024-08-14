from django.shortcuts import render, HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics, status
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            return HttpResponse({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        token = default_token_generator.make_token(user)
        uid = user.pk
        
        # Construct password reset URL
        password_reset_url = f"http://localhost:5173/reset-password?uid={uid}&token={token}"

        # Render email template
        email_subject = "Password Reset Requested"
        email_body = render_to_string('password_reset_email.html', {
            'user': user,
            'password_reset_url': password_reset_url,
        })

        # Send email
        send_mail(
            subject=email_subject,
            message=email_body,
            from_email='arash.sanaiha1@gmail.com',
            recipient_list=[email],
            fail_silently=False,
            html_message=email_body,
        )

        return HttpResponse({"success": "Password reset email has been sent."}, status=status.HTTP_200_OK)
