using System.Data.SQLite;
using System.Windows;

namespace Workbridge
{
    public partial class LoginPage : Window
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();
                string query = "SELECT Id, FullName FROM Users WHERE Email = @Email AND Password = @Password";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", EmailBox.Text);
                    cmd.Parameters.AddWithValue("@Password", PasswordBox.Password);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int userId = reader.GetInt32(0); // Get the user's ID
                            string fullName = reader.GetString(1); // Get the user's full name

                            MessageBox.Show($"Welcome, {fullName}!");

                            // Open the main window and pass the user ID
                            MainWindow main = new MainWindow(userId);
                            main.Show();
                            this.Close();
                        }
                        else
                        {
                            MessageBox.Show("Invalid credentials!");
                        }
                    }
                }
            }
        }

        private void OpenRegisterPage(object sender, RoutedEventArgs e)
        {
            RegisterPage register = new RegisterPage();
            register.Show();
            this.Close();
        }
    }
}