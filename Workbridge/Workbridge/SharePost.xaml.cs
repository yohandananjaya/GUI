using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Win32;

namespace Workbridge
{
    public partial class SharePost : Page
    {
        // List to store posts
        private readonly List<Post> posts;

        public SharePost()
        {
            InitializeComponent();

            // Initialize the list of posts with some default data
            posts = new List<Post>
            {
                new Post
                {
                    UserName = "Tharidu Perera",
                    Content = "Hello, this is my first post!",
                    Timestamp = DateTime.Now.ToString("hh:mm tt"),
                    UserImage = "D:\\Workbridge\\images\\freelance.png", // Default user image
                    PostImage = null // No post image
                },
                new Post
                {
                    UserName = "Kavinda jayasooriya",
                    Content = "Excited to join Workbridge!",
                    Timestamp = DateTime.Now.ToString("hh:mm tt"),
                    UserImage = "D:\\Workbridge\\images\\freelance.png", // Default user image
                    PostImage = null // No post image
                }
            };

            // Bind the posts to the ListBox
            PostsList.ItemsSource = posts;
        }

        // Event handler for the Share button
        private void ShareButton_Click(object sender, RoutedEventArgs e)
        {
            string postContent = PostInput.Text.Trim();

            if (!string.IsNullOrEmpty(postContent))
            {
                // Add the new post to the beginning of the list
                var newPost = new Post
                {
                    UserName = "Yohan", // Replace with actual user name
                    Content = postContent,
                    Timestamp = DateTime.Now.ToString("hh:mm tt"),
                    UserImage = "pack://application:,,,/Images/default_user.png", // Default user image
                    PostImage = selectedImagePath // Set the uploaded image path
                };

                posts.Insert(0, newPost); // Insert at the beginning of the list

                // Refresh the ListBox to display the new post
                PostsList.Items.Refresh();

                // Clear the input box and reset the image
                PostInput.Clear();
                selectedImagePath = null;
            }
            else
            {
                MessageBox.Show("Please enter some text to share.", "Error", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        // Variable to store the selected image path
        private string selectedImagePath;

        // Event handler for the Upload Photo button
        private void UploadPhotoButton_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "Image files (*.png;*.jpeg;*.jpg)|*.png;*.jpeg;*.jpg|All files (*.*)|*.*",
                Title = "Select an image"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                selectedImagePath = openFileDialog.FileName;
                MessageBox.Show("Photo uploaded successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }

    // Post class to represent a post
    public class Post
    {
        public string UserName { get; set; }
        public string Content { get; set; }
        public string Timestamp { get; set; }
        public string UserImage { get; set; } // Path to user's profile image
        public string PostImage { get; set; } // Path to post image
    }
}