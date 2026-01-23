# Career Application Uploads

This directory contains uploaded resumes/CVs from career applications.

## Structure
- `/resumes` - PDF files of applicant resumes

## Security Notes
- Only PDF files are accepted
- File size limit: 5MB
- All filenames are sanitized to prevent directory traversal attacks
- Input validation and XSS protection are implemented on all form fields

## Access
- Public URL: `/uploads/resumes/{filename}`
- Files are accessible via direct URL for admin download
