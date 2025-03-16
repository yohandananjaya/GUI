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
                bool isNewDatabase = !File.Exists(dbFile);

                if (isNewDatabase)
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

                    // Check if Profile table exists
                    string checkProfileTable = "SELECT name FROM sqlite_master WHERE type='table' AND name='Profile';";
                    using (var cmd = new SQLiteCommand(checkProfileTable, conn))
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (!reader.HasRows) // Table does not exist
                        {
                            CreateProfileTable(conn);
                        }
                        else
                        {
                            EnsureProfileTableIsUpdated(conn);
                        }
                    }

                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error initializing database: {ex.Message}");
            }
        }

        private static void CreateProfileTable(SQLiteConnection conn)
        {
            string createProfileTable = @"
                CREATE TABLE Profile (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    UserId INTEGER UNIQUE NOT NULL,
                    Department TEXT,
                    WorkExperience INTEGER,
                    CurrentProjects TEXT,
                    EducationLevel TEXT,
                    Certifications TEXT,
                    HardSkills TEXT,
                    SoftSkills TEXT,
                    Languages TEXT,
                    ProfilePhoto BLOB,
                    CoverPhoto BLOB,
                    FOREIGN KEY (UserId) REFERENCES Users(Id)
                );";
            using (var cmd = new SQLiteCommand(createProfileTable, conn))
            {
                cmd.ExecuteNonQuery();
            }
        }

        private static void EnsureProfileTableIsUpdated(SQLiteConnection conn)
        {
            AddMissingColumn(conn, "Profile", "ProfilePhoto", "BLOB");
            AddMissingColumn(conn, "Profile", "CoverPhoto", "BLOB");

            // Check if UserId is UNIQUE
            string checkUniqueConstraint = @"
                SELECT COUNT(*) FROM pragma_index_list('Profile') 
                WHERE origin='u' AND name LIKE '%UserId%';";
            using (var cmd = new SQLiteCommand(checkUniqueConstraint, conn))
            {
                int uniqueCount = Convert.ToInt32(cmd.ExecuteScalar());
                if (uniqueCount == 0)
                {
                    MessageBox.Show("UserId is not UNIQUE! Recreating the Profile table...");
                    RecreateProfileTable(conn);
                }
            }
        }

        private static void RecreateProfileTable(SQLiteConnection conn)
        {
            string renameOldTable = "ALTER TABLE Profile RENAME TO Profile_Old;";
            using (var cmd = new SQLiteCommand(renameOldTable, conn))
            {
                cmd.ExecuteNonQuery();
            }

            CreateProfileTable(conn);

            string migrateData = @"
                INSERT INTO Profile (UserId, Department, WorkExperience, CurrentProjects, 
                                    EducationLevel, Certifications, HardSkills, SoftSkills, 
                                    Languages, ProfilePhoto, CoverPhoto)
                SELECT UserId, Department, WorkExperience, CurrentProjects, 
                       EducationLevel, Certifications, HardSkills, SoftSkills, 
                       Languages, ProfilePhoto, CoverPhoto FROM Profile_Old;";
            using (var cmd = new SQLiteCommand(migrateData, conn))
            {
                cmd.ExecuteNonQuery();
            }

            string dropOldTable = "DROP TABLE Profile_Old;";
            using (var cmd = new SQLiteCommand(dropOldTable, conn))
            {
                cmd.ExecuteNonQuery();
            }
        }

        private static void AddMissingColumn(SQLiteConnection conn, string tableName, string columnName, string columnType)
        {
            string checkColumnQuery = $"PRAGMA table_info({tableName});";
            using (var cmd = new SQLiteCommand(checkColumnQuery, conn))
            using (var reader = cmd.ExecuteReader())
            {
                bool columnExists = false;
                while (reader.Read())
                {
                    if (reader["name"].ToString() == columnName)
                    {
                        columnExists = true;
                        break;
                    }
                }

                if (!columnExists)
                {
                    string alterTableQuery = $"ALTER TABLE {tableName} ADD COLUMN {columnName} {columnType};";
                    using (var alterCmd = new SQLiteCommand(alterTableQuery, conn))
                    {
                        alterCmd.ExecuteNonQuery();
                    }
                    MessageBox.Show($"Column {columnName} added successfully.");
                }
            }
        }

        public static SQLiteConnection GetConnection()
        {
            return new SQLiteConnection(connectionString);
        }
    }
}
