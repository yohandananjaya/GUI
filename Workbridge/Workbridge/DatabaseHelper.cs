using System;
using System.Data.SQLite;
using System.IO;
using System.Windows;

namespace Workbridge
{
    public class DatabaseHelper
    {
        private static readonly string dbFile = "App.db"; // Database file name
        private static readonly string connectionString = $"Data Source={dbFile};Version=3;";

        public static void InitializeDatabase()
        {
            try
            {
                if (!File.Exists(dbFile))
                {
                    SQLiteConnection.CreateFile(dbFile);
                    MessageBox.Show("Database file created successfully!");
                }

                using (var conn = new SQLiteConnection(connectionString))
                {
                    conn.Open();

                    // Create Users table
                    string createUserTable = @"
                        CREATE TABLE IF NOT EXISTS Users (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            FullName TEXT NOT NULL,
                            Email TEXT UNIQUE NOT NULL,
                            Password TEXT NOT NULL
                        );";
                    using (var cmd = new SQLiteCommand(createUserTable, conn))
                    {
                        cmd.ExecuteNonQuery();
                    }

                    // Create Profile table
                    string createProfileTable = @"
                        CREATE TABLE IF NOT EXISTS Profile (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            UserId INTEGER NOT NULL,
                            FullName TEXT NOT NULL,
                            Department TEXT,
                            WorkExperience INTEGER,
                            CurrentProjects TEXT,
                            EducationLevel TEXT,
                            Certifications TEXT,
                            HardSkills TEXT,
                            SoftSkills TEXT,
                            Languages TEXT,
                            FOREIGN KEY (UserId) REFERENCES Users(Id)
                        );";
                    using (var cmd = new SQLiteCommand(createProfileTable, conn))
                    {
                        cmd.ExecuteNonQuery();
                    }

                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error initializing database: {ex.Message}");
            }
        }

        public static SQLiteConnection GetConnection()
        {
            return new SQLiteConnection(connectionString);
        }
    }
}