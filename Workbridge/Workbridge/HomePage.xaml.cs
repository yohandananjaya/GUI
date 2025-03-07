using System;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Win32;

namespace Workbridge
{
    public partial class HomePage : Page
    {
        public HomePage()
        {
            InitializeComponent();
        }

        // Event handler for "Find Jobs" button
        private void FindJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Find Jobs button clicked!");
            // Add logic to navigate to a job search page or display job listings
        }

        // Event handler for "Part-Time Jobs" button
        private void PartTimeJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Part-Time Jobs button clicked!");
            // Add logic to filter and display part-time jobs
        }

        // Event handler for "Remote Jobs" button
        private void RemoteJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Remote Jobs button clicked!");
            // Add logic to filter and display remote jobs
        }

        // Event handler for "Freelance Jobs" button
        private void FreelanceJobs_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Freelance Jobs button clicked!");
            // Add logic to filter and display freelance jobs
        }

        // Event handler for "Share Post" button
        private void SharePost_Click(object sender, RoutedEventArgs e)
        {
            string postText = PostTextBox.Text;
            if (!string.IsNullOrWhiteSpace(postText))
            {
                MessageBox.Show("Post shared: " + postText);
                // Add logic to save the post to a database or display it in a feed
            }
            else
            {
                MessageBox.Show("Please write something to share!");
            }
        }

        // Event handler for "Upload Photo" button
        private void UploadPhoto_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.png;*.jpg;*.jpeg)|*.png;*.jpg;*.jpeg|All files (*.*)|*.*";
            if (openFileDialog.ShowDialog() == true)
            {
                string photoPath = openFileDialog.FileName;
                MessageBox.Show("Photo uploaded: " + photoPath);
                // Add logic to save the photo to a database or display it in a feed
            }
        }
    }
}