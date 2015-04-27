/**
 * Created by User on 31.03.15.
 */
public class History {

    public static int last_sended = 0;
    public static int last_edited = 0;
    public static int last_deleted = 0;
    public static int last_changed = 0;


    private int id;
    private static History instance = new History();
    private History()
    {
        last_sended = HistoryDatabase.findLastSended();
        last_edited = HistoryDatabase.findLastEdited();
        last_deleted = HistoryDatabase.findLastDeleted();
        last_changed = HistoryDatabase.findLastChanged();
        id = Math.max(Math.max(last_sended, last_edited) , Math.max(last_deleted, last_changed)) + 1;
    }

    public static History getInstance()
    {
        return instance;
    }
    public int getNextId(HistoryTypeAction type)
    {
        System.out.println("GetNextId" + last_sended + ' ' + last_edited + ' ' + last_deleted);
        if (type == HistoryTypeAction.SEND)
            last_sended = id;
        if (type == HistoryTypeAction.EDIT)
            last_edited = id;
        if (type == HistoryTypeAction.DELETE)
            last_deleted = id;
        if (type == HistoryTypeAction.CHANGE)
            last_changed = id;
        int d = id;
        id++;
        return d;
    }
    public int getId()
    {
        return id;
    }
}
