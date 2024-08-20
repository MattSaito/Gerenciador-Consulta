-- DATA FOR TESTS

-- DOCTOR TABLE
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_fees) VALUES (UUID(), 'user1', 'pass1', 'user1@example.com', 'Specialty1', 'CRM123', 100.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user2', 'pass2', 'user2@example.com', 'Specialty2', 'CRM456', 150.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user3', 'pass3', 'user3@example.com', 'Specialty3', 'CRM789', 120.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user4', 'pass4', 'user4@example.com', 'Specialty1', 'CRM321', 130.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user5', 'pass5', 'user5@example.com', 'Specialty2', 'CRM654', 110.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user6', 'pass6', 'user6@example.com', 'Specialty3', 'CRM987', 140.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user7', 'pass7', 'user7@example.com', 'Specialty1', 'CRM123', 120.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user8', 'pass8', 'user8@example.com', 'Specialty2', 'CRM456', 160.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user9', 'pass9', 'user9@example.com', 'Specialty3', 'CRM789', 130.00);
INSERT INTO DOCTOR (doctoruuid, username, password, email, specialization, CRM, doc_Fees) VALUES (UUID(), 'user10', 'pass10', 'user10@example.com', 'Specialty4', 'CRM321', 140.00);
-- PATIENT TABLE
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '123.456.789-01', 'patient1@email.com', 'FirstName1', 'LastName1', 'password123', '(11) 98765-4321');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '987.654.321-09', 'patient2@email.com', 'FirstName2', 'LastName2', 'password456', '(22) 87654-3210');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '111.222.333-44', 'patient3@email.com', 'FirstName3', 'LastName3', 'password789', '(33) 76543-2109');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '555.666.777-88', 'patient4@email.com', 'FirstName4', 'LastName4', 'passwordABC', '(44) 65432-1098');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '999.888.777-66', 'patient5@email.com', 'FirstName5', 'LastName5', 'passwordXYZ', '(55) 54321-0987');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '444.333.222-11', 'patient6@email.com', 'FirstName6', 'LastName6', 'password123XYZ','(66) 43210-9876');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '777.888.999-00', 'patient7@email.com', 'FirstName7', 'LastName7', 'passwordABCXYZ','(77) 32109-8765');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '222.111.000-99', 'patient8@email.com', 'FirstName8', 'LastName8', 'password123ABC','(88) 21098-7654');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '666.555.444-33', 'patient9@email.com', 'FirstName9', 'LastName9', 'passwordXYZABC','(99) 10987-6543');
INSERT INTO PATIENT (patientUUID, cpf, email, first_name, last_name, password, phone) VALUES (UUID(), '333.444.555-66', 'patient10@email.com', 'FirstName10', 'LastName10', 'passwordABCXYZ123','(00) 09876-5432');
-- MESSAGE TABLE
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 1 Description', 'email1@example.com', '(111) 111-1111', 'Sender1');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 2 Description', 'email2@example.com', '(222) 222-2222', 'Sender2');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 3 Description', 'email3@example.com', '(333) 333-3333', 'Sender3');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 4 Description', 'email4@example.com', '(444) 444-4444', 'Sender4');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 5 Description', 'email5@example.com', '(555) 555-5555', 'Sender5');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 6 Description', 'email6@example.com', '(666) 666-6666', 'Sender6');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 7 Description', 'email7@example.com', '(777) 777-7777', 'Sender7');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 8 Description', 'email8@example.com', '(888) 888-8888', 'Sender8');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 9 Description', 'email9@example.com', '(999) 999-9999', 'Sender9');
INSERT INTO MESSAGE (MESSAGEUUID, DESC, EMAIL, PHONE, SENDER) VALUES (UUID(), 'Message 10 Description', 'email10@example.com', '(000) 000-0000', 'Sender10');
