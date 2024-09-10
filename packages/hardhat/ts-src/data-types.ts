export type Item={
    _id:BigInt,
    _name:string,
    _category:string,
    _image:string,
    _cost:bigint,
    _rating:bigint,
    _stock:bigint,
    _description:string
}

export const items: Item[] = [
    {
      _id:BigInt(0),
      _name: "Wireless Headphones",
      _category: "Electronics",
      _image: "https://example.com/images/wireless-headphones.jpg",
      _cost: BigInt(19999),
      _rating: BigInt(4),
      _stock: BigInt(50),
      _description: "High-quality wireless headphones with noise-cancellation and long battery life."
    },
    {
      _id:BigInt(1),
      _name: "Smartphone",
      _category: "Electronics",
      _image: "https://example.com/images/smartphone.jpg",
      _cost: BigInt(69999),
      _rating: BigInt(5),
      _stock: BigInt(20),
      _description: "Latest model smartphone with cutting-edge technology and sleek design."
    },
    {
      _id:BigInt(2),
      _name: "Laptop",
      _category: "Electronics",
      _image: "https://example.com/images/laptop.jpg",
      _cost: BigInt(89999),
      _rating: BigInt(4),
      _stock: BigInt(15),
      _description: "Powerful laptop for professionals with high-speed performance and durability."
    },
    {
      _id:BigInt(3),
      _name: "Gaming Console",
      _category: "Gaming",
      _image: "https://example.com/images/gaming-console.jpg",
      _cost: BigInt(49999),
      _rating: BigInt(5),
      _stock: BigInt(30),
      _description: "Next-gen gaming console with immersive graphics and high processing power."
    },
    {
      _id:BigInt(4),
      _name: "Electric Guitar",
      _category: "Musical Instruments",
      _image: "https://example.com/images/electric-guitar.jpg",
      _cost: BigInt(14999),
      _rating: BigInt(4),
      _stock: BigInt(10),
      _description: "Premium electric guitar with smooth sound and easy playability."
    },
    {
      _id:BigInt(5),
      _name: "Blender",
      _category: "Kitchen Appliances",
      _image: "https://example.com/images/blender.jpg",
      _cost: BigInt(4999),
      _rating: BigInt(3),
      _stock: BigInt(100),
      _description: "High-speed blender with multiple settings for versatile blending."
    },
    {
      _id: BigInt(6),
      _name: "Air Fryer",
      _category: "Kitchen Appliances",
      _image: "https://example.com/images/air-fryer.jpg",
      _cost: BigInt(8999),
      _rating: BigInt(4),
      _stock: BigInt(60),
      _description: "Healthy cooking made easy with this compact and efficient air fryer."
    },
    {
      _id: BigInt(7),
      _name: "Smartwatch",
      _category: "Wearable Tech",
      _image: "https://example.com/images/smartwatch.jpg",
      _cost: BigInt(24999),
      _rating: BigInt(4),
      _stock: BigInt(35),
      _description: "Stylish smartwatch with fitness tracking, notifications, and long battery life."
    },
    {
      _id: BigInt(8),
      _name: "Digital Camera",
      _category: "Photography",
      _image: "https://example.com/images/digital-camera.jpg",
      _cost: BigInt(39999),
      _rating: BigInt(5),
      _stock: BigInt(25),
      _description: "Professional-grade digital camera with advanced features for photography enthusiasts."
    },
    {
      _id: BigInt(9),
      _name: "Bluetooth Speaker",
      _category: "Audio",
      _image: "https://example.com/images/bluetooth-speaker.jpg",
      _cost: BigInt(7999),
      _rating: BigInt(4),
      _stock: BigInt(80),
      _description: "Portable Bluetooth speaker with powerful sound and long-lasting battery."
    }
  ];
  