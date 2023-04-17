using System;
using System.Net;
using System.Net.Mail;

namespace EmailSender
{
    class Program
    {
        static void SendMail(string[] args)
        {

            try
            {
                // Gmail SMTP server settings
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587;
                string email = "your-email@gmail.com"; // Replace with your Gmail email address
                string password = "your-password"; // Replace with your Gmail password
                // Recipient email address
                string to = "recipient-email@example.com"; // Replace with the recipient's email address

                // Create a new SMTP client
                SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(email, password);

                // Create a new MailMessage object
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(email);
                mail.To.Add(to);
                mail.Subject = "Hello from ChatGPT!";
                mail.Body = "This is a test email sent from ChatGPT using Gmail SMTP server.";

                // Send the email
                smtpClient.Send(mail);

                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
    }
}

namespace Server.handler
{
    public class MailHandler
    {
        public static void SendMail(string recipient, string body)
        {
            try
            {
                // Gmail SMTP server settings
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587;
                string email = "your-email@gmail.com"; // Replace with your Gmail email address
                string password = "your-password"; // Replace with your Gmail password

                // Recipient email address
                string to = "recipient-email@example.com"; // Replace with the recipient's email address

                // Create a new SMTP client
                SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(email, password);

                // Create a new MailMessage object
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(email);
                mail.To.Add(to);
                mail.Subject = "Hello from Sanjai!";
                mail.Body = "This is a test email sent from Sanjai using Gmail SMTP server.";

                // Send the email
                smtpClient.Send(mail);

                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
    }

}