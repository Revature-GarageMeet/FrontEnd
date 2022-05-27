export interface chatMessage
{
    // userid, message, type, dateCreated
    uniqueId : string;
    username : string;
    message: string;
    type: string;
    dateCreated : Date;
}