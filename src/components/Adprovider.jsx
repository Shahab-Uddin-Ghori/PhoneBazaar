import { createContext, useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Ensure these are correctly imported
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);

  const fetchAds = async () => {
    try {
      const adsCollection = collection(db, "ads");
      const adsSnapshot = await getDocs(adsCollection);
      const adsList = adsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAds(adsList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const setAdData = async (newAd) => {
    try {
      // Create a unique document reference
      const adDocRef = doc(collection(db, "ads"));

      // Image upload
      const imageRef = ref(storage, `ads/${adDocRef.id}`); // Using unique id for the image
      const snapshot = await uploadBytes(imageRef, newAd.imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Save ad data to Firestore
      await addDoc(collection(db, "ads"), {
        id: adDocRef.id,
        ...newAd,
        imageFile: imageUrl,
      });

      // Refresh ads list
      fetchAds();
    } catch (error) {
      console.error("Error adding ad: ", error);
    }
  };

  return (
    <AdContext.Provider value={{ ads, setAdData }}>
      {children}
    </AdContext.Provider>
  );
};
