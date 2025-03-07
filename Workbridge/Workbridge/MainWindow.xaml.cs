using System;
using System.Windows;
using System.Windows.Navigation;

namespace Workbridge
{
    public partial class MainWindow : Window
    {
        private int _userId; // Store the logged-in user's ID

        public MainWindow(int userId)
        {
            InitializeComponent();
            _userId = userId;
            MainContent.Navigate(new HomePage()); // Load HomePage by default
        }

        private void GoToHome(object sender, RoutedEventArgs e)
        {
            MainContent.Navigate(new HomePage());
        }

        private void GoToProfile(object sender, RoutedEventArgs e)
        {
            // Navigate to the ProfilePage and pass the user ID
            MainContent.Navigate(new ProfilePage(_userId));
        }
        private void GoToGroup(object sender, RoutedEventArgs e)
        {
            MainContent.Navigate(new GroupPage());
        }
        private void GoToMessages(object sender, RoutedEventArgs e)
        {
            MainContent.Navigate(new Uri("MessagesPage.xaml", UriKind.Relative));
        }

        private void Logout(object sender, RoutedEventArgs e)
        {
            LoginPage loginPage = new LoginPage();
            loginPage.Show();
            this.Close();
        }
    }
}