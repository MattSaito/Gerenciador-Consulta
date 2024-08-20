package com.vh.hms.services;


import com.vh.hms.domain.message.Message;
import com.vh.hms.domain.message.MessageDTO;
import com.vh.hms.repositories.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    @Transactional(readOnly = true)
    public Page<MessageDTO> findAllPaged(Pageable pageable) {
        return messageRepository.findAll(pageable).map(MessageDTO::new);
    }
    @Transactional(readOnly = true)
    public MessageDTO findById(UUID uuid) {
        Message message = notNullValidator(uuid);
        return new MessageDTO(message);
    }

    public MessageDTO update(UUID uuid, MessageDTO messageDTO) {
        Message message = notNullValidator(uuid);
        BeanUtils.copyProperties(messageDTO, message);
        return new MessageDTO(messageRepository.save(message));
    }
    public UUID create(MessageDTO messageDTO) {
        Message message = new Message();
        BeanUtils.copyProperties(messageDTO, message);
        return messageRepository.save(message).getMessageUUID();
    }

    public void deleteById(UUID id) {
        Message message = notNullValidator(id);
        messageRepository.delete(message);
    }

    private Message notNullValidator(UUID id) {
        Optional<Message> messageOptional = messageRepository.findById(id);
        return messageOptional.orElseThrow(() -> new EntityNotFoundException("Message not found"));
    }
}
