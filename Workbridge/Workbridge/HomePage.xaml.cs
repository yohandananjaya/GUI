using System;
using System.Windows;
using System.Windows.Controls;

namespace Workbridge
{
    public partial class HomePage : Page
    {
        public HomePage()
        {
            InitializeComponent();
        }

        private void Page_SizeChanged(object sender, SizeChangedEventArgs e)
        {
            if (e.NewSize.Width < 800)
            {
                WelcomeText.FontSize = 24; // Smaller font size for smaller windows
            }
            else
            {
                WelcomeText.FontSize = 40; // Default font size for larger windows
            }
        }

        // Event handler for "Find Jobs" button
        private void FindJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Find Jobs button clicked!");
        }

        // Event handler for "Part-Time Jobs" button
        private void PartTimeJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Part-Time Jobs button clicked!");
        }

        // Event handler for "Remote Jobs" button
        private void RemoteJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Remote Jobs button clicked!");
        }

        // Event handler for "Freelance Jobs" button
        private void FreelanceJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Freelance Jobs button clicked!");
        }

        // Event handler for "Search" button
        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            string searchText = SearchTextBox.Text;
            if (!string.IsNullOrWhiteSpace(searchText))
            {
                MessageBox.Show("Searching for: " + searchText);
                // Add logic to search for jobs based on the search text
            }
            else
            {
                MessageBox.Show("Please enter a search term!");
            }
        }

        // Event handler for TextBox text change
        private void SearchTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            SearchPlaceholder.Visibility = string.IsNullOrEmpty(SearchTextBox.Text) ? Visibility.Visible : Visibility.Collapsed;
        }

        // Event handler for TextBox focus
        private void SearchTextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            SearchPlaceholder.Visibility = Visibility.Collapsed;
        }

        // Event handler for TextBox lost focus
        private void SearchTextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            SearchPlaceholder.Visibility = string.IsNullOrEmpty(SearchTextBox.Text) ? Visibility.Visible : Visibility.Collapsed;
        }
    }
}