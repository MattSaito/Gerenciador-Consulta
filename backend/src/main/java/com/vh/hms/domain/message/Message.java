package com.vh.hms.domain.message;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Message implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID messageUUID;
    private String sender;
    private String email;
    private String phone;
    private String description;

    public Message() {}
    public Message(UUID messageUUID, String sender, String email, String phone, String description) {
        this.messageUUID = messageUUID;
        this.sender = sender;
        this.email = email;
        this.phone = phone;
        this.description = description;
    }

    public UUID getMessageUUID() {
        return messageUUID;
    }

    public void setMessageUUID(UUID messageUUID) {
        this.messageUUID = messageUUID;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(messageUUID, message.messageUUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(messageUUID);
    }
}
