import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const heading = screen.getByRole('heading', {level: 1});
    expect(heading).toBeInTheDocument();
    expect(heading).toBeTruthy();
    expect(heading).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Dave');
    const errors = screen.getByText(/error:/i);
    expect(errors).toBeVisible();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByText(/first name/i);
    const lastNameInput = screen.getByText(/last name/i);
    const submitButton = screen.getByText(/submit/i);

    userEvent.type(firstNameInput, 'Daniel');
    userEvent.type(lastNameInput, 'Longheart');
    userEvent.click(submitButton);

    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByText(/email/i);
    
    userEvent.type(emailInput, 'false@email');

    const emailError = await screen.getByText(/email must be a valid email address/i);
    expect(emailError).toBeVisible;
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const submitbButton = screen.getByRole('button');

    userEvent.click(submitbButton);
    
    const lastNameError = screen.getByText(/lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument;
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const submitButton = screen.getByText(/submit/i);

    userEvent.type(firstNameInput, 'Daniel');
    userEvent.type(lastNameInput, 'Longheart');
    userEvent.type(emailInput, 'daniel@longheart.com');
    userEvent.click(submitButton);

    const firstNameSubmitted = await screen.getByText('Daniel');
    const lastNameSubmitted = screen.getByText('Longheart');
    const emailSubmitted = screen.getByText('daniel@longheart.com');

    expect(firstNameSubmitted).toBeVisible;
    expect(lastNameSubmitted).toBeVisible;
    expect(emailSubmitted).toBeTruthy;
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const messageInput = screen.getByText(/message/i);
    const submitButton = screen.getByText(/submit/i);

    userEvent.type(firstNameInput, 'Daniel');
    userEvent.type(lastNameInput, 'Longheart');
    userEvent.type(emailInput, 'daniel@longheart.com');
    userEvent.type(messageInput, 'Please contact me with all your deals; I will buy them all!');
    userEvent.click(submitButton);

    const firstNameSubmitted = await screen.getByText('Daniel');
    const lastNameSubmitted = screen.getByText('Longheart');
    const emailSubmitted = screen.getByText('daniel@longheart.com');
    const messageSubmitted = screen.getByText('Please contact me with all your deals; I will buy them all!');

    expect(firstNameSubmitted).toBeVisible;
    expect(lastNameSubmitted).toBeVisible;
    expect(emailSubmitted).toBeVisible;
    expect(messageSubmitted).toBeVisible;
});
