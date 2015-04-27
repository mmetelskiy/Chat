import com.google.gson.Gson;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by User on 29.03.15.
 */
public class MessageController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        System.out.println("GetReq");
        CommandName commandName = CommandName.getCommandName(req.getParameter("command"));
        executeCommand(req, resp, commandName);
        //System.out.println(req);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post");
        CommandName commandName = CommandName.getCommandName(req.getParameter("command"));
        executeCommand(req, resp, commandName);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("put");
        InputStreamReader isr = new InputStreamReader(req.getInputStream());
        BufferedReader bf = new BufferedReader(isr);
        String body = bf.readLine();
        System.out.println(body);
        Gson gson = new Gson();
        gson = Gson.
        //CommandName commandName = CommandName.getCommandName(req.getParameter("command"));
        CommandName commandName = CommandName.getCommandName("edit");
        executeCommand(req, resp, commandName);
        System.out.println(req);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("delete");
        CommandName commandName = CommandName.getCommandName(req.getParameter("command"));
        executeCommand(req, resp, commandName);
        System.out.println(req);
    }



    private void executeCommand(HttpServletRequest req, HttpServletResponse resp, CommandName commandName) throws IOException {
        switch (commandName) {
            case GET_ALL_MESSAGE:
                //System.out.println("GetAllMessages");
                String username = req.getParameter("username");
                String last_id_hist = req.getParameter("token");
                List<Message> messages = DatabaseHelper.loadMessages(username, last_id_hist);
                //System.out.println("Last_id_send" + History.getInstance().last_sended);
                saveInJsonFormat(resp, messages, History.getInstance().last_sended);
                break;
            case GET_ALL_EDITED_MESSAGE:
                String last_id_edit_hist = req.getParameter("token");
                List<Message> editedMessages = DatabaseHelper.loadEditedMessages(last_id_edit_hist);
                //System.out.println(editedMessages.size());
                //System.out.println("Last_id_edit" + History.getInstance().last_edited);
                saveInJsonFormat(resp, editedMessages, History.getInstance().last_edited);
                break;
            case GET_ALL_DELETED_MESSAGE:
                String last_id_delete_hist = req.getParameter("token");
                List<String> deletedMessages = DatabaseHelper.loadDeletedMessages(last_id_delete_hist);
                //System.out.println(deletedMessages.size());
                //System.out.println("Last_id_delete" + History.getInstance().last_deleted);
                saveStringsInJsonFormat(resp, deletedMessages, History.getInstance().last_deleted);
                break;
            case GET_ALL_CHANGED_USER:
                String last_id_change_hist = req.getParameter("token");
                List<String> user_names = HistoryDatabase.convertIdHistToChangedUsers(last_id_change_hist);
                //System.out.println(deletedMessages.size());
                //System.out.println("Last_id_delete" + History.getInstance().last_deleted);
                saveStringsInJsonFormat(resp, user_names, History.getInstance().last_changed);
                break;
            case SEND:
                System.out.println("Send");
                Message message = createMessage(req);
                DatabaseHelper.save(message);
                HistoryDatabase.send(message);
                break;
            case EDIT:
                System.out.println("Edit");
                String id = req.getParameter("id");
                String text = req.getParameter("text");
                System.out.println("Edit_id" + id);
                DatabaseHelper.edit(id, text);
                HistoryDatabase.edit(id);
                
                break;
            case CHANGE_USER:
                String oldName = req.getParameter("username");
                String user = req.getParameter("user");
                DatabaseHelper.changeUser(oldName, user);
                HistoryDatabase.changeUser(oldName, user);
                break;
            case DELETE:
                System.out.println("DeleteController");
                String ids = req.getParameter("ids");
                DatabaseHelper.delete(ids);
                HistoryDatabase.delete(ids);
                break;
        }
    }

    private void saveInJsonFormat(HttpServletResponse resp, List<Message> messages, int last_id) throws IOException {
        Gson gson = new Gson();
        String id = String.valueOf(last_id);
        //String jsonMessages = gson.toJson(new Obj(messages));
        String jsonMessages = gson.toJson(messages);
        PrintWriter out = resp.getWriter();
        out.print(jsonMessages);
        out.print(id);
    }

    private void saveStringsInJsonFormat(HttpServletResponse resp, List<String> ids, int last_id) throws IOException {
        Gson gson = new Gson();
        String id = String.valueOf(last_id);
        //String jsonMessages = gson.toJson(new Obj(messages));
        String jsonMessages = gson.toJson(ids);
        PrintWriter out = resp.getWriter();
        out.print(jsonMessages);
        out.print(id);
    }


    private Message createMessage(HttpServletRequest req) {
        Message message = new Message();
        message.setText(req.getParameter("text"));
        message.setId(req.getParameter("id"));
        message.setUser(req.getParameter("user"));
        message.setImg(req.getParameter("img"));
        message.setTime(req.getParameter("time"));
        return message;
    }

    public static Map<String, String[]> buildParameterMapFromRequestBody(InputStream body) {
        Map<String, String[]>map = new HashMap<String, String[]>();
        return map;
    }

}
