import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 29.03.15.
 */

public final class DatabaseHelper {
    private static StringBuilder builder = new StringBuilder();
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/chat";
    static final String USER = "root";
    static final String PASS = "123456";

    private DatabaseHelper() {

    }

    private static String buildDeleteQueryString(String[] identifiers) {
        String sql = "DELETE FROM message WHERE id IN (";
        builder.setLength(0);

        for (int index = 0; index < identifiers.length; index++) {
            builder.append(identifiers[index] + ",");
        }
        builder.deleteCharAt(builder.length() - 1).toString();
        builder.append(")");
        sql += builder.toString();
        return sql;
    }


    public static List<Message> loadMessages(String username, String last_id_hist) {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<Message> messages = new ArrayList<Message>();
        String id_mes = HistoryDatabase.convertIdHistToIdMesSended(last_id_hist);
        System.out.println(id_mes);
        System.out.println(last_id_hist);
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT * FROM message WHERE id > ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, id_mes);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Message message = new Message();
                message.setText(rs.getString("text"));
                message.setId(rs.getString("id"));
                message.setUser(rs.getString("user"));
                message.setImg(rs.getString("img"));
                message.setTime(rs.getString("time"));
                messages.add(message);
            }
            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println("Load messages" + messages.size());
        return messages;
    }

    public static List<Message> loadEditedMessages(String last_id_hist) {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<Message> messages = new ArrayList<Message>();
        List<String> ids_mes = HistoryDatabase.convertIdHistToIdMesEdited(last_id_hist);
        System.out.println(last_id_hist);
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT FROM message WHERE id = ?";
            stmt = conn.prepareStatement(sql);

            for (int count_mes = 0; count_mes < ids_mes.size(); count_mes++) {
                stmt.setInt(1, Integer.valueOf(ids_mes.get(count_mes)));
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    Message message = new Message();
                    message.setText(rs.getString("text"));
                    message.setId(rs.getString("id"));
                    message.setUser(rs.getString("user"));
                    message.setImg(rs.getString("img"));
                    message.setTime(rs.getString("time"));
                    messages.add(message);
                }
                rs.close();
            }
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return messages;
    }

    public static List<String> loadDeletedMessages(String last_id_hist) {
        List<String> ids_mes = HistoryDatabase.convertIdHistToIdMesDeleted(last_id_hist);
        return ids_mes;
    }

    public static void save(Message message) {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "INSERT INTO message (text, id, user, img, time) VALUES (?,?,?,?,?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, message.getText());
            stmt.setString(2, message.getId());
            stmt.setString(3, message.getUser());
            stmt.setString(4, message.getImg());
            stmt.setString(5, message.getTime());
            stmt.execute();
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void edit(String id, String text) {
        Connection conn = null;
        PreparedStatement stmt = null;
        System.out.println("Edit");
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "UPDATE message SET text = ? WHERE id = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, text);
            stmt.setString(2, id);
            stmt.execute();
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void changeUser(String oldName, String user) {
        Connection conn = null;
        PreparedStatement stmt = null;
        System.out.println("User");
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "UPDATE message SET user =? WHERE user = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, user);
            stmt.setString(2, oldName);
            stmt.execute();
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void delete(String ids) {
        String[] identifiers = ids.split(",");
        Connection conn = null;
        Statement stmt = null;
        System.out.println("Delete");
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();
            String sql = buildDeleteQueryString(identifiers);
            stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (Exception se) {
            se.printStackTrace();
        } finally {
            try {
                stmt.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
