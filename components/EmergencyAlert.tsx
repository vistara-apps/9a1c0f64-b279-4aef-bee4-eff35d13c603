'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { AlertTriangle, Phone, Plus, X, Send } from 'lucide-react';
import { type EmergencyContact } from '@/lib/types';
import { validatePhoneNumber, getCurrentLocation } from '@/lib/utils';
import { EMERGENCY_ALERT_TEMPLATE, STORAGE_KEYS } from '@/lib/constants';

interface EmergencyAlertProps {
  variant?: 'trigger' | 'confirmation';
  onAlertSent?: (contacts: EmergencyContact[]) => void;
}

export function EmergencyAlert({ variant = 'trigger', onAlertSent }: EmergencyAlertProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  // Load contacts from localStorage on component mount
  useState(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEYS.emergencyContacts);
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  });

  const saveContacts = (updatedContacts: EmergencyContact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem(STORAGE_KEYS.emergencyContacts, JSON.stringify(updatedContacts));
  };

  const addContact = () => {
    if (!newContact.name.trim() || !validatePhoneNumber(newContact.phone)) {
      alert('Please enter a valid name and phone number');
      return;
    }

    const contact: EmergencyContact = {
      id: `contact_${Date.now()}`,
      name: newContact.name.trim(),
      phone: newContact.phone.trim(),
    };

    const updatedContacts = [...contacts, contact];
    saveContacts(updatedContacts);
    setNewContact({ name: '', phone: '' });
    setIsAddingContact(false);
  };

  const removeContact = (contactId: string) => {
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    saveContacts(updatedContacts);
  };

  const sendEmergencyAlert = async () => {
    if (contacts.length === 0) {
      alert('Please add at least one emergency contact');
      return;
    }

    setIsSendingAlert(true);
    
    try {
      // Get current location
      let locationText = 'Location unavailable';
      try {
        const position = await getCurrentLocation();
        locationText = `${position.coords.latitude}, ${position.coords.longitude}`;
      } catch (error) {
        console.warn('Could not get location:', error);
      }

      // Prepare alert message
      const template = EMERGENCY_ALERT_TEMPLATE.en;
      const message = template.message
        .replace('{location}', locationText)
        .replace('{timestamp}', new Date().toLocaleString());

      // In a real app, this would send SMS/email to contacts
      // For demo purposes, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Emergency alert sent:', {
        contacts,
        message,
        location: locationText,
        timestamp: new Date().toISOString(),
      });

      setAlertSent(true);
      onAlertSent?.(contacts);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
      alert('Failed to send emergency alert. Please try again.');
    } finally {
      setIsSendingAlert(false);
    }
  };

  if (alertSent) {
    return (
      <Card className="w-full max-w-md mx-auto border-green-500/50 bg-green-500/10">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Send className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Alert Sent Successfully
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your emergency contacts have been notified with your location and timestamp.
          </p>
          <Button
            variant="outline"
            onClick={() => setAlertSent(false)}
            className="w-full"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Emergency Contact Alert
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Contacts List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Emergency Contacts</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingContact(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {contacts.length === 0 ? (
            <div className="p-4 bg-surface/40 rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground">
                No emergency contacts added yet
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 bg-surface/40 rounded-lg border border-border"
                >
                  <div>
                    <div className="font-medium text-foreground">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.phone}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContact(contact.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Contact Form */}
        {isAddingContact && (
          <div className="space-y-3 p-4 bg-surface/40 rounded-lg border border-border">
            <Input
              placeholder="Contact name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <Input
              placeholder="Phone number"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={addContact} size="sm" className="flex-1">
                Add Contact
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAddingContact(false);
                  setNewContact({ name: '', phone: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Send Alert Button */}
        <Button
          onClick={sendEmergencyAlert}
          disabled={isSendingAlert || contacts.length === 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          {isSendingAlert ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Sending Alert...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Send Emergency Alert
            </>
          )}
        </Button>

        <div className="p-3 bg-surface/40 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            This will send your current location and a pre-defined message to all emergency contacts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
