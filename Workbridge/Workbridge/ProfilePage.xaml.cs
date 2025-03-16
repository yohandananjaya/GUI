using Microsoft.Win32;
using System;
using System.Data.SQLite;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace Workbridge
{
    public partial class ProfilePage : Page
    {
        private readonly int _userId; // Store the logged-in user's ID

        public ProfilePage(int userId)
        {
            InitializeComponent();
            _userId = userId;
            LoadProfileData(); // Load profile data when the page is initialized
        }

        private void LoadProfileData()
        {
            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();
                string query = "SELECT * FROM Profile WHERE UserId = @UserId";
                using (var cmd = new SQLiteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@UserId", _userId);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            // Populate the form with existing profile data
                            DepartmentBox.Text = reader["Department"]?.ToString() ?? string.Empty;
                            NameBox.Text = reader["Name"]?.ToString() ?? string.Empty;
                            WorkExperienceBox.Text = reader["WorkExperience"]?.ToString() ?? string.Empty;
                            CurrentProjectsBox.Text = reader["CurrentProjects"]?.ToString() ?? string.Empty;
                            EducationLevelBox.Text = reader["EducationLevel"]?.ToString() ?? string.Empty;
                            CertificationsBox.Text = reader["Certifications"]?.ToString() ?? string.Empty;
                            HardSkillsBox.Text = reader["HardSkills"]?.ToString() ?? string.Empty;
                            SoftSkillsBox.Text = reader["SoftSkills"]?.ToString() ?? string.Empty;
                            LanguagesBox.Text = reader["Languages"]?.ToString() ?? string.Empty;

                            // Load profile and cover photos (check if columns exist)
                            if (HasColumn(reader, "ProfilePhoto") && reader["ProfilePhoto"] != DBNull.Value)
                            {
                                byte[] profilePhotoBytes = (byte[])reader["ProfilePhoto"];
                                ProfilePhotoBrush.ImageSource = LoadImage(profilePhotoBytes);
                            }

                            if (HasColumn(reader, "CoverPhoto") && reader["CoverPhoto"] != DBNull.Value)
                            {
                                byte[] coverPhotoBytes = (byte[])reader["CoverPhoto"];
                                CoverPhotoImage.Source = LoadImage(coverPhotoBytes);
                            }
                        }
                        else
                        {
                            // Clear fields if no profile is found
                            DepartmentBox.Text = string.Empty;
                            NameBox.Text = string.Empty;
                            WorkExperienceBox.Text = string.Empty;
                            CurrentProjectsBox.Text = string.Empty;
                            EducationLevelBox.Text = string.Empty;
                            CertificationsBox.Text = string.Empty;
                            HardSkillsBox.Text = string.Empty;
                            SoftSkillsBox.Text = string.Empty;
                            LanguagesBox.Text = string.Empty;

                            MessageBox.Show("No profile found for this user.");
                        }
                    }
                }
            }
        }

        private BitmapImage LoadImage(byte[] imageData)
        {
            if (imageData == null || imageData.Length == 0) return null;

            var image = new BitmapImage();
            using (var mem = new System.IO.MemoryStream(imageData))
            {
                mem.Position = 0;
                image.BeginInit();
                image.CreateOptions = BitmapCreateOptions.PreservePixelFormat;
                image.CacheOption = BitmapCacheOption.OnLoad;
                image.UriSource = null;
                image.StreamSource = mem;
                image.EndInit();
            }
            image.Freeze();
            return image;
        }

        private void SaveProfile(object sender, RoutedEventArgs e)
        {
            using (var conn = DatabaseHelper.GetConnection())
            {
                conn.Open();

                // Check if the profile already exists
                string checkQuery = "SELECT COUNT(*) FROM Profile WHERE UserId = @UserId";
                using (var checkCmd = new SQLiteCommand(checkQuery, conn))
                {
                    checkCmd.Parameters.AddWithValue("@UserId", _userId);
                    int count = Convert.ToInt32(checkCmd.ExecuteScalar());

                    if (count > 0)
                    {
                        // Update existing profile
                        string updateQuery = @"
                        UPDATE Profile SET
                            Department = @Department,
                            Name =@Name,
                            WorkExperience = @WorkExperience,
                            CurrentProjects = @CurrentProjects,
                            EducationLevel = @EducationLevel,
                            Certifications = @Certifications,
                            HardSkills = @HardSkills,
                            SoftSkills = @SoftSkills,
                            Languages = @Languages,
                            ProfilePhoto = @ProfilePhoto,
                            CoverPhoto = @CoverPhoto
                        WHERE UserId = @UserId";

                        using (var updateCmd = new SQLiteCommand(updateQuery, conn))
                        {
                            updateCmd.Parameters.AddWithValue("@UserId", _userId);
                            updateCmd.Parameters.AddWithValue("@Department", DepartmentBox.Text);
                            updateCmd.Parameters.AddWithValue("@Name", NameBox.Text);
                            updateCmd.Parameters.AddWithValue("@WorkExperience", WorkExperienceBox.Text);
                            updateCmd.Parameters.AddWithValue("@CurrentProjects", CurrentProjectsBox.Text);
                            updateCmd.Parameters.AddWithValue("@EducationLevel", EducationLevelBox.Text);
                            updateCmd.Parameters.AddWithValue("@Certifications", CertificationsBox.Text);
                            updateCmd.Parameters.AddWithValue("@HardSkills", HardSkillsBox.Text);
                            updateCmd.Parameters.AddWithValue("@SoftSkills", SoftSkillsBox.Text);
                            updateCmd.Parameters.AddWithValue("@Languages", LanguagesBox.Text);
                            updateCmd.Parameters.AddWithValue("@ProfilePhoto", GetImageBytes(ProfilePhotoBrush.ImageSource as BitmapImage));
                            updateCmd.Parameters.AddWithValue("@CoverPhoto", GetImageBytes(CoverPhotoImage.Source as BitmapImage));

                            updateCmd.ExecuteNonQuery();
                        }
                    }
                    else
                    {
                        // Insert new profile
                        string insertQuery = @"
                        INSERT INTO Profile (
                            UserId, Department,Name, WorkExperience, CurrentProjects, EducationLevel, Certifications, HardSkills, SoftSkills, Languages, ProfilePhoto, CoverPhoto
                        ) VALUES (
                            @UserId, @Department,@Name, @WorkExperience, @CurrentProjects, @EducationLevel, @Certifications, @HardSkills, @SoftSkills, @Languages, @ProfilePhoto, @CoverPhoto
                        )";

                        using (var insertCmd = new SQLiteCommand(insertQuery, conn))
                        {
                            insertCmd.Parameters.AddWithValue("@UserId", _userId);
                            insertCmd.Parameters.AddWithValue("@Department", DepartmentBox.Text);
                            insertCmd.Parameters.AddWithValue("@Name", NameBox.Text);
                            insertCmd.Parameters.AddWithValue("@WorkExperience", WorkExperienceBox.Text);
                            insertCmd.Parameters.AddWithValue("@CurrentProjects", CurrentProjectsBox.Text);
                            insertCmd.Parameters.AddWithValue("@EducationLevel", EducationLevelBox.Text);
                            insertCmd.Parameters.AddWithValue("@Certifications", CertificationsBox.Text);
                            insertCmd.Parameters.AddWithValue("@HardSkills", HardSkillsBox.Text);
                            insertCmd.Parameters.AddWithValue("@SoftSkills", SoftSkillsBox.Text);
                            insertCmd.Parameters.AddWithValue("@Languages", LanguagesBox.Text);
                            insertCmd.Parameters.AddWithValue("@ProfilePhoto", GetImageBytes(ProfilePhotoBrush.ImageSource as BitmapImage));
                            insertCmd.Parameters.AddWithValue("@CoverPhoto", GetImageBytes(CoverPhotoImage.Source as BitmapImage));

                            insertCmd.ExecuteNonQuery();
                        }
                    }

                    // Refresh UI with updated data
                    LoadProfileData();
                    MessageBox.Show("Profile saved successfully!");
                }
            }
        }

        private byte[] GetImageBytes(BitmapImage image)
        {
            if (image == null) return null;
            using (var memStream = new System.IO.MemoryStream())
            {
                var encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(image));
                encoder.Save(memStream);
                return memStream.ToArray();
            }
        }

        private void ChangeProfilePhoto_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.png;*.jpeg;*.jpg)|*.png;*.jpeg;*.jpg|All files (*.*)|*.*";
            if (openFileDialog.ShowDialog() == true)
            {
                ProfilePhotoBrush.ImageSource = new BitmapImage(new Uri(openFileDialog.FileName));
            }
        }

        private void ChangeCoverPhoto_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.png;*.jpeg;*.jpg)|*.png;*.jpeg;*.jpg|All files (*.*)|*.*";
            if (openFileDialog.ShowDialog() == true)
            {
                CoverPhotoImage.Source = new BitmapImage(new Uri(openFileDialog.FileName));
            }
        }

        // Helper method to check if a column exists in the result set
        private bool HasColumn(SQLiteDataReader reader, string columnName)
        {
            for (int i = 0; i < reader.FieldCount; i++)
            {
                if (reader.GetName(i).Equals(columnName, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }
            return false;
        }
    }
}