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

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {

// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
