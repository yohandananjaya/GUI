using System.Windows;

namespace Workbridge
{
    public partial class GetStartedWindow : Window
    {
        public GetStartedWindow()
        {
            InitializeComponent();
        }

        private void GetStarted_Click(object sender, RoutedEventArgs e)
        {
            // Open the LoginPage
            LoginPage loginPage = new LoginPage();
            loginPage.Show();

            // Close the current window
            this.Close();
        }
    }
}