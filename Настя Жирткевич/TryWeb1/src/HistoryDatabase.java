import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.ArrayList;


/**
 * Created by User on 06.04.15.
 */
public class HistoryDatabase {
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/chat";
    static final String USER = "root";
    static final String PASS = "123456";

    private HistoryDatabase() {
    }

    public static int findLastSended()
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        int id = 0;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT MAX(id_hist) AS id_hist from sended";
            stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                id = rs.getInt("id_hist");
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
        return id;
    }

    public static int findLastEdited()
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        int id = 0;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT MAX(id_hist) AS id_hist from edited";
            stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                id = rs.getInt("id_hist");
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
        return id;
    }

    public static int findLastDeleted()
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        int id = 0;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT MAX(id_hist) AS id_hist from deleted";
            stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                id = rs.getInt("id_hist");
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
        return id;
    }

    public static int findLastChanged()
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        int id = 0;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT MAX(id_hist) AS id_hist from names";
            stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                id = rs.getInt("id_hist");
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
        return id;
    }

    public static String convertIdHistToIdMesSended(String id_hist)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        String id_mes = "000000000";
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT * FROM sended WHERE id_hist = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, Integer.valueOf(id_hist));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                id_mes = rs.getString("id_mes");
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
        return id_mes;
    }

    public static List<String> convertIdHistToIdMesEdited(String id_hist)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<String> ids_mes = new ArrayList<String>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT * FROM edited WHERE id_hist > ?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, Integer.valueOf(id_hist));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ids_mes.add(rs.getString("id_mes"));
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
        return ids_mes;
    }

    public static List<String> convertIdHistToIdMesDeleted(String id_hist)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<String> ids_mes = new ArrayList<String>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT * FROM deleted WHERE id_hist > ?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, Integer.valueOf(id_hist));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ids_mes.add(rs.getString("id_mes"));
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
        return ids_mes;
    }

    public static List<String> convertIdHistToChangedUsers(String id_hist)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        List<String> names = new ArrayList<String>();
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "SELECT * FROM names WHERE id_hist > ?";
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, Integer.valueOf(id_hist));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                names.add(rs.getString("old_name"));
                names.add(rs.getString("new_name"));
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
        return names;
    }


    public static void send(Message message)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "INSERT INTO sended (id_mes, id_hist) VALUES (?,?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, message.getId());
            stmt.setInt(2, History.getInstance().getNextId(HistoryTypeAction.SEND));
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

    public static void edit(String id_mes)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "INSERT INTO edited (id_mes, id_hist) VALUES (?,?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, id_mes);
            stmt.setInt(2, History.getInstance().getNextId(HistoryTypeAction.EDIT));
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

    public static void delete(String ids)
    {
        String[] identifiers = ids.split(",");
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "INSERT INTO deleted (id_mes, id_hist) VALUES (?,?)";
            for (int count_mes = 0; count_mes < identifiers.length; count_mes++) {
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, identifiers[count_mes]);
                stmt.setInt(2, History.getInstance().getNextId(HistoryTypeAction.DELETE));
                stmt.execute();
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
    }

    public static void changeUser(String oldName, String user)
    {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql = "INSERT INTO names (old_name, new_name, id_hist) VALUES (?,?,?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, oldName);
            stmt.setString(2, user);
            stmt.setInt(3, History.getInstance().getNextId(HistoryTypeAction.CHANGE));
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


}
