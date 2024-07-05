import smtplib
import ssl
from django.core.mail.backends.smtp import EmailBackend

class CustomEmailBackend(EmailBackend):
    def open(self):
        """Ensure a connection is established."""
        if self.connection:
            return False

        connection_params = self.get_connection_params()

        try:
            self.connection = smtplib.SMTP(**connection_params)

            if self.use_tls:
                context = ssl.create_default_context()
                # If you need to load a client certificate and key
                # context.load_cert_chain(certfile="path/to/certfile", keyfile="path/to/keyfile")
                self.connection.starttls(context=context)

            if self.username and self.password:
                self.connection.login(self.username, self.password)

            return True
        except smtplib.SMTPException as e:
            if not self.fail_silently:
                raise
            return False

    def get_connection_params(self):
        """Return a dictionary of keyword arguments for establishing an SMTP connection."""
        return {
            'host': self.host,
            'port': self.port,
            'local_hostname': getattr(self, 'local_hostname', None),
            'timeout': getattr(self, 'timeout', None),
            'source_address': getattr(self, 'source_address', None),
        }
