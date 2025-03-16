#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// WiFi credentials
char ssid[] = "your_SSID";   // Replace with your WiFi SSID
char pass[] = "your_PASSWORD";  // Replace with your WiFi Password

// Blynk Authentication Token
char auth[] = "your_BLYNK_AUTH_TOKEN";  

// ECG sensor pin
#define ECG_PIN A0  

// Initialize Blynk
BlynkTimer timer;

// Function to send ECG data
void sendECGData() {
  int ecgValue = analogRead(ECG_PIN);
  Blynk.virtualWrite(V1, ecgValue);  // Sending ECG data to Blynk App
  Serial.println(ecgValue); // Debugging
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  Blynk.begin(auth, ssid, pass);

  Serial.println("ECG Monitoring System Initialized...");
  
  // Call sendECGData function every second
  timer.setInterval(1000L, sendECGData);
}

void loop() {
  Blynk.run();
  timer.run();
}
