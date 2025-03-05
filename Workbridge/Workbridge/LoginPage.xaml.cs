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
                string query = "SELECT FullName FROM Users WHERE Email=@Email AND Password=@Password";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", EmailBox.Text);
                    cmd.Parameters.AddWithValue("@Password", PasswordBox.Password);

                    var result = cmd.ExecuteScalar();
                    if (result != null)
                    {
                        MessageBox.Show($"Welcome, {result}!");
                        MainWindow main = new MainWindow();
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

        private void OpenRegisterPage(object sender, RoutedEventArgs e)
        {
            RegisterPage register = new RegisterPage();
            register.Show();
            this.Close();
        }
    }
}