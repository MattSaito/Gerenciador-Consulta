package com.vh.hms.repositories;

import com.vh.hms.domain.message.Message;
import com.vh.hms.domain.message.MessageDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.persistence.EntityManager;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnabledIf("test")
class MessageRepositoryTest {

    @Autowired
    EntityManager entityManager;

    @Test
    @DisplayName("Should save and find a message")
    void shouldSaveAndFetchMessage() {
        MessageDTO messageDTO = new MessageDTO(
                UUID.randomUUID(),
                "Test",
                "tested@email.com",
                "123456789",
                "Just a test message"
        );

        Message savedMessage = createMessage(messageDTO);

        Message foundMessage = entityManager.find(Message.class, savedMessage.getMessageUUID());

        assertThat(foundMessage).isNotNull();
        assertThat(foundMessage.getMessageUUID()).isEqualTo(savedMessage.getMessageUUID());
        assertThat(foundMessage.getSender()).isEqualTo("Test");
        assertThat(foundMessage.getEmail()).isEqualTo("tested@email.com");
        assertThat(foundMessage.getPhone()).isEqualTo("123456789");
        assertThat(foundMessage.getDescription()).isEqualTo("Just a test message");
    }

    private Message createMessage(MessageDTO data) {
        Message message = new Message(data);
        this.entityManager.persist(message);
        return message;
    }
}
