import { createContext, useState, useEffect } from "react"; // Import necessary hooks and functions from React
import { db, storage } from "../firebase"; // Import Firestore database and storage from Firebase
import { collection, addDoc, getDocs, doc } from "firebase/firestore"; // Import Firestore functions for database operations
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage functions for file uploads
import { toast } from "react-toastify"; // Import toast for notifications

// Create a context for managing ads
export const AdContext = createContext();

// Provider component to manage ads data
export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]); // State to hold the list of ads

  // Function to fetch ads from Firestore
  const fetchAds = async () => {
    try {
      const adsCollection = collection(db, "ads"); // Get reference to the ads collection
      const adsSnapshot = await getDocs(adsCollection); // Fetch all ads documents
      const adsList = adsSnapshot.docs.map((doc) => ({
        id: doc.id, // Get document id
        ...doc.data(), // Spread the document data into the object
      }));
      setAds(adsList); // Update state with the fetched ads
    } catch (error) {
      toast.error(error.message); // Show error notification if fetching fails
    }
  };

  // useEffect to fetch ads when the component mounts
  useEffect(() => {
    fetchAds(); // Call fetchAds to get ads data
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to set new ad data in Firestore
  const setAdData = async (newAd) => {
    try {
      // Create a unique document reference for the new ad
      const adDocRef = doc(collection(db, "ads"));

      // Reference for the image upload in storage
      const imageRef = ref(storage, `ads/${adDocRef.id}`); // Using the unique id for the image reference
      const snapshot = await uploadBytes(imageRef, newAd.imageFile); // Upload the image file
      const imageUrl = await getDownloadURL(snapshot.ref); // Get the download URL for the uploaded image

      // Save ad data to Firestore including the image URL
      await addDoc(collection(db, "ads"), {
        id: adDocRef.id, // Set the document id
        ...newAd, // Spread the new ad data
        imageFile: imageUrl, // Include the uploaded image URL
      });

      // Refresh the ads list to include the newly added ad
      fetchAds(); // Call fetchAds to update the ads state
    } catch (error) {
      console.error("Error adding ad: ", error); // Log error if adding ad fails
    }
  };

  return (
    <AdContext.Provider value={{ ads, setAdData }}>
      {" "}
      {/* Provide ads and setAdData to children */}
      {children} {/* Render child components */}
    </AdContext.Provider>
  );
};
