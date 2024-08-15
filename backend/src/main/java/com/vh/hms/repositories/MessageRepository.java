package com.vh.hms.repositories;

import com.vh.hms.domain.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
public interface MessageRepository extends JpaRepository <Message, UUID> {
}
