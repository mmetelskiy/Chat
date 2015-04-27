/**
 * Created by User on 29.03.15.
 */
public enum CommandName {

    GET_ALL_MESSAGE("getAllMessage"),
    GET_ALL_EDITED_MESSAGE("getAllEditedMessage"),
    GET_ALL_DELETED_MESSAGE("getAllDeletedMessage"),
    GET_ALL_CHANGED_USER("getAllChangedUser"),
    SEND("send"),
    EDIT("edit"),
    CHANGE_USER("changeUser"),
    DELETE("delete");


    private String commandName;

    private CommandName(String name) {
        commandName = name;
    }

    static public CommandName getCommandName(String name) {
        for (CommandName commandName : CommandName.values()) {
            if (commandName.getCommandName().toLowerCase().equals(name.toLowerCase())) {
                return commandName;
            }
        }
        throw new RuntimeException("unknown commandName");
    }

    public String getCommandName() {
        return commandName;
    }
}