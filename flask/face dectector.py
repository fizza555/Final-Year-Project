# Import necessary libraries
import cv2
from mtcnn import MTCNN
import matplotlib.pyplot as plt

# Initialize MTCNN face detector
detector = MTCNN()

# Load the video
video_path = '/content/dataset/FakeAVCeleb_v1.2/FakeVideo-RealAudio/Asian (East)/men/id00056/00028_id00597_wavtolip.mp4'  # Update this path to your video file in Colab
cap = cv2.VideoCapture(video_path)

# Check if video opened successfully
if not cap.isOpened():
    print("Error: Could not open video.")
    exit()

# Initialize frame counter
frame_count = 0
max_frames = 5  # Maximum number of frames to process

# Store processed frames
processed_frames = []

# Flag to track if any faces were detected
any_faces_detected = False

# Process video frames
while cap.isOpened() and frame_count < max_frames:
    ret, frame = cap.read()
    if not ret:
        break  # Exit the loop if there are no frames left

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert frame to RGB format

    # Detect faces
    faces = detector.detect_faces(rgb_frame)

    # Check if any faces were detected
    if faces:
        any_faces_detected = True

    # Draw bounding box and text
    for face in faces:
        x, y, width, height = face['box']
        cv2.rectangle(frame, (x, y), (x + width, y + height), (255, 0, 0), 2)  # Draw bounding box

        # Add text "Face Detected" below the bounding box
        cv2.putText(frame, "Face Detected", (x, y + height + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

    # If no faces were detected, print message
    if not faces:
        print(f"Frame {frame_count + 1}: No faces detected")

    # Append processed frame to the list
    processed_frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    # Increment the frame counter
    frame_count += 1

# Release the video capture object
cap.release()

# Display the processed frames
plt.figure(figsize=(20, 5))
for i in range(len(processed_frames)):
    plt.subplot(1, len(processed_frames), i + 1)
    plt.imshow(processed_frames[i])
    plt.axis('off')  # Hide axis
plt.show()

# Print final message based on detection results
if any_faces_detected:
    print("Faces detected in the video.")
else:
    print("No faces detected in the video.")
