/**
 * Created by User on 29.03.15.
 */
public class Message {
    private String text;
    private String id;
    private String user;
    private String img;
    private String time;

    public Message() {

    }

    public Message(String text, String id, String user, String img, String time) {
        this.text = text;
        this.id = id;
        this.user = user;
        this.img = img;
        this.time = time;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Message [text=" + text + ", id=" + id + ", user=" + user
                + ", img=" + img + ", time=" + time + "]";
    }


}
