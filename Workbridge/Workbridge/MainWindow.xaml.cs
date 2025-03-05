using System.Windows;
using System.Windows.Navigation;

namespace Workbridge
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            MainContent.Navigate(new HomePage()); // Load HomePage by default
        }

        private void GoToHome(object sender, RoutedEventArgs e)
        {
            MainContent.Navigate(new HomePage());
        }

        private void GoToProfile(object sender, RoutedEventArgs e)
        {
            MainContent.Navigate(new ProfilePage());
        }

        private void Logout(object sender, RoutedEventArgs e)
        {
            LoginPage loginPage = new LoginPage();
            loginPage.Show();
            this.Close();
        }
    }
}