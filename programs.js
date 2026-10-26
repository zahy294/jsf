// Programs from Java_Spring_Lab_Manual_Draft_2024-25.pdf (Experiments 1a - 3)
window.EXPERIMENTS = [
  {
    id: "A1",
    title: "Experiment 1a - SimpleServlet (GET & POST)",
    files: [
      {
        name: "SimpleServlet.java",
        code: String.raw`package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SimpleServlet")
public class SimpleServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Submit Your Details</h2>");
        out.println("<form method='POST' action='SimpleServlet'>");
        out.println("Name: <input type='text' name='name'><br><br>");
        out.println("Password: <input type='password' name='password'><br><br>");
        out.println("<input type='submit' value='Submit'>");
        out.println("</form>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String password = request.getParameter("password");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>Submitted Data</h2>");
        out.println("Name: " + name + "<br>");
        out.println("Password: " + password + "<br>");
        out.println("</body></html>");
    }
}`
      }
    ]
  },
  {
    id: "B1",
    title: "Experiment 1b - SessionServlet (Session tracking)",
    files: [
      {
        name: "SessionServlet.java",
        code: String.raw`package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/ServletDemo/SessionServlet")
public class SessionServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {

            /* TODO output your page here. You may use following sample code. */

            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SessionServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SessionServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Check if the logout action is requested
        String action = request.getParameter("action");
        if ("logout".equals(action)) {

            HttpSession session = request.getSession(false);
            if (session != null) {

                session.invalidate(); // Invalidate the session
            }
            response.sendRedirect("SessionServlet"); // Redirect to the login page
            return;
        }

        // Check if session exists
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("username") != null) {
            // User is logged in, display welcome message and session info

            out.println("<html><head><title>Welcome</title></head><body>");
            out.println("<h2>Welcome, " + session.getAttribute("username") + "!</h2>");
            out.println("<p><a href='SessionServlet?action=logout'>Logout</a></p>");
            out.println("<h3>Session Information:</h3>");
            out.println("<p>Session ID: " + session.getId() + "</p>");
            out.println("<p>Creation Time: " + new java.util.Date(session.getCreationTime()) + "</p>");
            out.println("<p>Last Accessed Time: " + new java.util.Date(session.getLastAccessedTime()) + "</p>");
            out.println("</body></html>");

        } else {
            // User is not logged in, display login form

            out.println("<html><head><title>Login</title></head><body>");
            out.println("<h2>Login</h2>");
            out.println("<form method='post' action='SessionServlet'>");
            out.println("Username: <input type='text' name='username'><br><br>");
            out.println("Password: <input type='password' name='password'><br><br>");
            out.println("<input type='submit' value='Login'>");
            out.println("</form>");
            out.println("</body></html>");

        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Process login form submission
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // For demonstration purposes, validate against hardcoded credentials

        if (username != null && username.equals("admin") && password != null && password.equals("password")) {

            // Login successful, create session and store username
            HttpSession session = request.getSession(true); // create new session if not exists

            session.setAttribute("username", username);

            // Redirect to doGet to display welcome message and session info
            response.sendRedirect("SessionServlet");
        } else {

            // Login failed, redirect back to login page
            response.sendRedirect("SessionServlet");
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Process logout (via DELETE request)
        HttpSession session = request.getSession(false);
        if (session != null) {

            session.invalidate(); // invalidate session
        }
        response.sendRedirect("SessionServlet");
    }

}`
      }
    ]
  },
  {
    id: "A2",
    title: "Experiment 2a - JSP Employee Information",
    files: [
      {
        name: "employeeForm.jsp",
        code: String.raw`<!DOCTYPE html>
<html>
<head>

    <title>Employee Form</title>
</head>
<body>

    <h2>Employee Information Form</h2>
    <form action="employeeResult.jsp" method="POST">
        <table>
            <tr>
                <td>Employee ID:</td>
                <td><input type="text" name="employeeId" required></td>
            </tr>
            <tr>
                <td>Name:</td>
                <td><input type="text" name="name" required></td>
            </tr>
            <tr>
                <td>Age:</td>
                <td><input type="number" name="age" required></td>
            </tr>
            <tr>
                <td>Department:</td>
                <td><input type="text" name="department" required></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><input type="email" name="email" required></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <input type="submit" value="Submit">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>`
      },
      {
        name: "employeeResult.jsp",
        code: String.raw`<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.Calendar" %>
<!DOCTYPE html>
<html>
<head>

    <title>Employee Information</title>
</head>
<body>

    <h2>Employee Information Result</h2>
    <%

        // Retrieve form data
        String employeeId = request.getParameter("employeeId");
        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");
        String department = request.getParameter("department");
        String email = request.getParameter("email");

        // Process data
        int age = Integer.parseInt(ageStr);
        Calendar calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int birthYear = currentYear - age;
        String nameAndDepartment = name + " (" + department + ")";

        // Format email
        String formattedEmail = email.toLowerCase();
    %>
    <table border="1">
        <tr>

            <th>Employee ID</th>
            <td><%= employeeId %></td>
        </tr>
        <tr>
            <th>Name and Department</th>
            <td><%= nameAndDepartment %></td>
        </tr>
        <tr>
            <th>Birth Year</th>
            <td><%= birthYear %></td>
        </tr>
        <tr>
            <th>Formatted Email</th>
            <td><%= formattedEmail %></td>
        </tr>
    </table>
</body>
</html>`
      }
    ]
  },
  {
    id: "B2",
    title: "Experiment 2b - JSP Employee Server-side Validation",
    files: [
      {
        name: "employeeForm.jsp",
        code: String.raw`<!DOCTYPE html>
<html>
<head>

    <title>Employee Form</title>
</head>
<body>

    <h2>Employee Information Form</h2>
    <form action="employeeResult.jsp" method="POST">

        Employee ID: <input type="text" name="employeeId" required><br>

        Name: <input type="text" name="name" required><br>
        Age: <input type="number" name="age" required><br>
        Department:
        <select name="department" required>

            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
        </select><br>
        Email: <input type="email" name="email" required><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>`
      },
      {
        name: "employeeResult.jsp",
        code: String.raw`<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.regex.*" %>
<!DOCTYPE html>
<html>
<head>

    <title>Employee Information</title>
</head>
<body>

    <h2>Employee Information Result</h2>
    <%

        // Retrieve form data
        String employeeId = request.getParameter("employeeId");
        String name = request.getParameter("name");
        String ageStr = request.getParameter("age");
        String department = request.getParameter("department");
        String email = request.getParameter("email");

        // Initialize error messages
        String employeeIdError = "";
        String nameError = "";
        String ageError = "";
        String departmentError = "";
        String emailError = "";

        // Validation flags
        boolean isValid = true;

        // Validate Employee ID
        if (employeeId == null || employeeId.trim().isEmpty()) {

            employeeIdError = "Employee ID is required.";
            isValid = false;
        }

        // Validate Name
        if (name == null || !name.matches("^[a-zA-Z\\s]+$")) {

            nameError = "Name must contain only letters and spaces.";

            isValid = false;
        }

        // Validate Age
        int age = 0;
        try {

            age = Integer.parseInt(ageStr);
            if (age < 18 || age > 65) {

                ageError = "Age must be between 18 and 65.";
                isValid = false;
            }
        } catch (NumberFormatException e) {
            ageError = "Age must be a valid numeric value.";
            isValid = false;

        }

        // Validate Department
        if (department == null || department.trim().isEmpty()) {

            departmentError = "Department is required.";
            isValid = false;
        } else if (!department.matches("HR|Finance|IT|Sales")) {
            departmentError = "Invalid department selected.";
            isValid = false;
        }

        // Validate Email
        if (email == null || !email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {

            emailError = "Email must be in a valid format (e.g., name@example.com).";

            isValid = false;
        }

        if (isValid) {
            // Process data
            int currentYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
            int birthYear = currentYear - age;
            String nameAndDepartment = name + " (" + department + ")";

            // Format email
            String formattedEmail = email.toLowerCase();
    %>
            <table border="1">

                <tr>
                    <th>Employee ID</th>
                    <td><%= employeeId %></td>

                </tr>
                <tr>

                    <th>Name and Department</th>
                    <td><%= nameAndDepartment %></td>
                </tr>
                <tr>
                    <th>Birth Year</th>
                    <td><%= birthYear %></td>
                </tr>
                <tr>
                    <th>Formatted Email</th>
                    <td><%= formattedEmail %></td>
                </tr>
            </table>
    <%

        } else {
            // Display error messages and guide the user

    %>
            <h3>Validation Errors</h3>
            <ul>
                <% if (!employeeIdError.isEmpty()) { %>
                    <li><b>Employee ID:</b> <%= employeeIdError %></li>
                <% } %>
                <% if (!nameError.isEmpty()) { %>
                    <li><b>Name:</b> <%= nameError %></li>
                <% } %>
                <% if (!ageError.isEmpty()) { %>
                    <li><b>Age:</b> <%= ageError %></li>
                <% } %>
                <% if (!departmentError.isEmpty()) { %>
                    <li><b>Department:</b> <%= departmentError %></li>
                <% } %>
                <% if (!emailError.isEmpty()) { %>
                    <li><b>Email:</b> <%= emailError %></li>
                <% } %>

            </ul>
            <!--<a href="employeeForm.jsp">Go back to the form</a>-->
            <a href="index.html">Go back to the form</a>
    <%
        }
    %>
</body>
</html>`
      }
    ]
  },
  {
    id: "3",
    title: "Experiment 3 - JSP + JDBC Student CRUD",
    files: [
      {
        name: "DBConnection.java",
        code: String.raw`package com.studentcrud;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static String jdbcURL = "jdbc:mysql://localhost:3306/studentDB";

    private static String jdbcUsername = "root";
    private static String jdbcPassword = "password";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return connection;

    }
}`
      },
      {
        name: "Student.java",
        code: String.raw`package com.studentcrud;

public class Student {
    private int rollNo;
    private String name;
    private String email;
    private int age;

    // Getters
    public int getRollNo() {
        return rollNo;
    }

    public String getName() {
        return name;

    }

    public String getEmail() {
        return email;

    }

    public int getAge() {
        return age;

    }

    // Setters
    public void setRollNo(int rollNo) {

        this.rollNo = rollNo;
    }

    public void setName(String name) {
        this.name = name;

    }

    public void setEmail(String email) {
        this.email = email;

    }

    public void setAge(int age) {
        this.age = age;

    }

    // toString method
    @Override
    public String toString() {

        return "Student{" +
                "rollNo=" + rollNo +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';

    }
}`
      },
      {
        name: "StudentDAO.java",
        code: String.raw`package com.studentcrud;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
    public void addStudent(Student student) {
        String sql = "INSERT INTO students (roll_no, name, email, age) VALUES (?, ?, ?, ?)";
        try (Connection connection = DBConnection.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, student.getRollNo());
            preparedStatement.setString(2, student.getName());
            preparedStatement.setString(3, student.getEmail());
            preparedStatement.setInt(4, student.getAge());
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();

        }
    }

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT * FROM students";
        try (Connection connection = DBConnection.getConnection();
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                Student student = new Student();
                student.setRollNo(resultSet.getInt("roll_no"));
                student.setName(resultSet.getString("name"));
                student.setEmail(resultSet.getString("email"));
                student.setAge(resultSet.getInt("age"));
                students.add(student);

            }
        } catch (SQLException e) {

            e.printStackTrace();
        }
        return students;
    }

    public void updateStudent(Student student) {
        String sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE roll_no = ?";
        try (Connection connection = DBConnection.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getEmail());
            preparedStatement.setInt(3, student.getAge());
            preparedStatement.setInt(4, student.getRollNo());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteStudent(int rollNo) {
        String sql = "DELETE FROM students WHERE roll_no = ?";
        try (Connection connection = DBConnection.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, rollNo);
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();

        }
    }
}`
      },
      {
        name: "addStudent.jsp",
        code: String.raw`<%@ page import="com.studentcrud.Student, com.studentcrud.StudentDAO" %>
<%

    if(request.getParameter("rollNo") != null) {
        int rollNo = Integer.parseInt(request.getParameter("rollNo"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        int age = Integer.parseInt(request.getParameter("age"));

        Student student = new Student();
        student.setRollNo(rollNo);
        student.setName(name);
        student.setEmail(email);
        student.setAge(age);

        StudentDAO dao = new StudentDAO();
        dao.addStudent(student);

        out.println("Student added successfully.");
    }

%>
<html>
<body>

    <h2>Add Student</h2>
    <form action="addStudent.jsp" method="post">

        Roll No: <input type="text" name="rollNo"><br>
        Name: <input type="text" name="name"><br>
        Email: <input type="text" name="email"><br>
        Age: <input type="text" name="age"><br>
        <input type="submit" value="Add Student">
    </form>
    <a href="viewStudents.jsp">View Students</a>
</body>
</html>`
      },
      {
        name: "viewStudents.jsp",
        code: String.raw`<%@ page import="java.util.List, com.studentcrud.Student, com.studentcrud.StudentDAO" %>
<%

    StudentDAO dao = new StudentDAO();
    List<Student> students = dao.getAllStudents();
%>
<html>
<body>
    <h2>View Students</h2>
    <table border="1">

        <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>

        </tr>
        <%

            for(Student student : students) {
        %>
        <tr>

            <td><%= student.getRollNo() %></td>
            <td><%= student.getName() %></td>
            <td><%= student.getEmail() %></td>
            <td><%= student.getAge() %></td>
            <td>

                <a href="updateStudent.jsp?rollNo=<%= student.getRollNo() %>">Edit</a> |

                <a href="deleteStudent.jsp?rollNo=<%= student.getRollNo() %>">Delete</a>

            </td>
        </tr>
        <%

            }

        %>
    </table>
    <a href="addStudent.jsp">Add Student</a>
</body>
</html>`
      },
      {
        name: "updateStudent.jsp",
        code: String.raw`<%@ page import="com.studentcrud.Student, com.studentcrud.StudentDAO" %>
<%

    StudentDAO dao = new StudentDAO();
    int rollNo = Integer.parseInt(request.getParameter("rollNo"));
    Student student = new Student();
    for(Student s : dao.getAllStudents()) {

        if(s.getRollNo() == rollNo) {
            student = s;
            break;

        }
    }

    if(request.getParameter("name") != null) {
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        int age = Integer.parseInt(request.getParameter("age"));

        student.setName(name);
        student.setEmail(email);
        student.setAge(age);

        dao.updateStudent(student);
        out.println("Student updated successfully.");

    }
%>

<html>
<body>

    <h2>Update Student</h2>
    <form action="updateStudent.jsp?rollNo=<%= student.getRollNo() %>" method="post">

        Name: <input type="text" name="name" value="<%= student.getName() %>"><br>

        Email: <input type="text" name="email" value="<%= student.getEmail() %>"><br>

        Age: <input type="text" name="age" value="<%= student.getAge() %>"><br>

        <input type="submit" value="Update Student">
    </form>

    <a href="viewStudents.jsp">View Students</a>
</body>
</html>`
      },
      {
        name: "deleteStudent.jsp",
        code: String.raw`<%@ page import="com.studentcrud.StudentDAO" %>
<%

    int rollNo = Integer.parseInt(request.getParameter("rollNo"));

    StudentDAO dao = new StudentDAO();
    dao.deleteStudent(rollNo);
    out.println("Student deleted successfully.");
%>
<html>
<body>
    <a href="viewStudents.jsp">View Students</a>
</body>
</html>`
      }
    ]
  }
];
