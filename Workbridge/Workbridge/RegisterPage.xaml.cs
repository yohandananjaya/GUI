using System;
using System.Data.SQLite;
using System.Windows;

namespace Workbridge
{
    public partial class RegisterPage : Window
    {
        public RegisterPage()
        {
            InitializeComponent();
        }

        private void Register_Click(object sender, RoutedEventArgs e)
        {
            // Validate input fields
            if (string.IsNullOrWhiteSpace(FullNameBox.Text) ||
                string.IsNullOrWhiteSpace(EmailBox.Text) ||
                string.IsNullOrWhiteSpace(PasswordBox.Password))
            {
                MessageBox.Show("Please fill in all fields.");
                return;
            }

            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();
                string query = "INSERT INTO Users (FullName, Email, Password) VALUES (@FullName, @Email, @Password)";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@FullName", FullNameBox.Text);
                    cmd.Parameters.AddWithValue("@Email", EmailBox.Text);
                    cmd.Parameters.AddWithValue("@Password", PasswordBox.Password);

                    try
                    {
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Registration Successful!");

                        // Navigate back to the login page
                        LoginPage loginPage = new LoginPage();
                        loginPage.Show();
                        this.Close();
                    }
                    catch (SQLiteException ex)
                    {
                        if (ex.Message.Contains("UNIQUE constraint failed"))
                        {
                            MessageBox.Show("Email already registered. Please use a different email.");
                        }
                        else
                        {
                            MessageBox.Show($"Error during registration: {ex.Message}");
                        }
                    }
                }
            }
        }

        private void BackToLogin(object sender, RoutedEventArgs e)
        {
            LoginPage loginPage = new LoginPage();
            loginPage.Show();
            this.Close();
        }

        private void FullNameBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {

        }
    }
}