import React, { useState } from 'react'; // Import useState for form management
import { db } from './firebaseConfig'; // Import the initialized Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

// Helper component for icons to avoid direct lucide-react dependency in this single file example.
// In a real project, you would install lucide-react and import icons.
const Icon = ({ name, size = 24, strokeWidth = 2, color = 'currentColor' }) => {
  const icons = {
    GitBranch: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="3" x2="6" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
    ),
    ExternalLink: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    ),
    Mail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    Phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.37-3.37A19.79 19.79 0 0 1 2 2.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    MapPin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return icons[name] || null;
};


// Main App Component
const App = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // To provide feedback to the user

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setStatus('Sending...'); // Set status to indicate submission is in progress

    try {
      // Add a new document to the "contacts" collection in Firestore
      await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        message: message,
        timestamp: serverTimestamp() // Add a server-generated timestamp
      });
      setStatus('Message sent successfully! Thank you.'); // Success message
      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('Failed to send message. Please try again later.'); // Error message
    }
  };

  return (
    // Tailwind CSS is assumed to be available.
    // Use 'Inter' font via global styles or a link in public/index.html.
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Navbar */}
      <nav className="fixed z-50 w-full bg-white shadow-sm backdrop-blur-sm transition-all duration-300 ease-in-out">
        <div className="container mx-auto flex items-center justify-between py-6 px-4 md:px-8">
          <a href="#hero" className="text-xl font-bold text-emerald-600 rounded-md p-2 transition duration-200 hover:scale-105">
            [Malkagalla Karunakar]
          </a>
          <div className="hidden md:flex space-x-4 ml-auto">
            <a
              href="#about"
              className="group relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 ease-in-out
                          hover:text-emerald-700 hover:bg-emerald-50
                          before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-emerald-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out
                          group-hover:before:scale-x-100 text-lg" // Added text-lg
            >
              About
            </a>
            <a
              href="#skills"
              className="group relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 ease-in-out
                          hover:text-emerald-700 hover:bg-emerald-50
                          before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-emerald-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out
                          group-hover:before:scale-x-100 text-lg" // Added text-lg
            >
              Skills
            </a>
            <a
              href="#projects"
              className="group relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 ease-in-out
                          hover:text-emerald-700 hover:bg-emerald-50
                          before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-emerald-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out
                          group-hover:before:scale-x-100"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="group relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 ease-in-out
                          hover:text-emerald-700 hover:bg-emerald-50
                          before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-emerald-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out
                          group-hover:before:scale-x-100 text-lg" // Added text-lg
            >
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="hero" className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            {/* Placeholder image for your profile picture */}
            <img
              src="https://placehold.co/150x150/047857/FFFFFF?text=MK"
              alt="Profile Picture"
              className="h-36 w-36 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/047857/FFFFFF?text=User" }}
            />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-amber-300">Karunakar</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
            A passionate <span className="font-semibold">Software Developer</span> focused on building impactful and user-friendly web applications.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-emerald-600 shadow-lg transition-all duration-300 hover:scale-105"
          >
            View My Work <Icon name="ExternalLink" size={20} className="ml-2" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-lg leading-relaxed text-gray-700 space-y-4 md:pl-16">
              <p>
                Hello! Karunakar, a dedicated software developer with a strong foundation in modern web technologies. My journey in tech started with a fascination for how digital solutions can solve real-world problems.
              </p>
              <p>
                I specialize in front-end development, primarily working with React.js and Tailwind CSS, and have experience building responsive, performant, and accessible user interfaces. I am learning backend development, focusing on technologies like Node.js and databases, with the goal of contributing across the full stack.
              </p>
              <p>
                Outside of coding, I enjoy playing cricket, reading newspapers, and trying new foods. I'm always eager to learn new technologies and collaborate on exciting projects.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src="/imagee.jpg"
                alt="About Me Image" className="w-full max-w-md rounded-lg shadow-xl object-cover border-4 border-emerald-500"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/6EE7B7/FFFFFF?text=Image+Not+Found" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            My Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Firebase", "MongoDB",
            ].map((skill, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-6 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-emerald-600">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "E-commerce Frontend",
                description: "NEXAON is a futuristic e-commerce app featuring responsive login/signup, an interactive cart for item management, a user profile, and a smooth checkout process including address, payment, and order confirmation",
                tech: ["Html", "CSS", "Java Script"],
                github: "https://github.com/KarunakarMalkagalla/NEXOAN",
                live: "#"
              },
              {
                title: "Credit Card Fraud Detection System",
                description: "A real-time Credit Card Fraud Detection web app built with Streamlit and Logistic Regression. It effectively tackles highly imbalanced data through advanced preprocessing, delivering accurate, instant predictions with confidence scores",
                tech: ["Python", "Streamlit", "Scikit-learn", "Numpy", "Pandas"],
                github: "https://github.com/KarunakarMalkagalla/Credit-Card-Fraud-Detection",
                live: "https://credit-card-fraud-detection-45.streamlit.app/"
              },
              {
                title: "Modern Personal Portfolio Website",
                description: "Developed a modern, responsive personal portfolio website, it comprehensively showcases my professional identity, technical skills, and key projects. Features intuitive navigation, detailed project showcases, and a direct contact section.",
                tech: ["React.js", "Tailwand CSS","Firebase"],
                github: "https://github.com/KarunakarMalkagalla/Personal-Portfolio",
                live: "https://personal-portfolio-abf49.web.app/"
              },
            ].map((project, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-50 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col border border-gray-200"
              >
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="mb-3 text-2xl font-bold text-emerald-700">{project.title}</h3>
                  <p className="mb-4 text-gray-700 flex-grow">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-200"
                    >
                      <Icon name="GitBranch" size={20} className="mr-1" /> GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-200"
                    >
                      <Icon name="ExternalLink" size={20} className="mr-1" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Get In Touch
          </h2>
          <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg md:p-10">
            <p className="mb-6 text-center text-lg text-gray-700">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            {/* Simple Contact Form updated to use Firebase Firestore */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name} // Controlled component
                  onChange={(e) => setName(e.target.value)} // Update state on change
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email} // Controlled component
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={message} // Controlled component
                  onChange={(e) => setMessage(e.target.value)} // Update state on change
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl"
                disabled={status === 'Sending...'} // Disable button during submission
              >
                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
              </button>
              {status && ( // Display status message
                <p className={`text-center mt-4 text-sm ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-white">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Malkagalla Karunakar. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://github.com/KarunakarMalkagalla" className="text-gray-400 hover:text-emerald-300 transition duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/karunakar-malkagalla-591b47318/" className="text-gray-400 hover:text-emerald-300 transition duration-200">LinkedIn</a>
            <a href="https://leetcode.com/u/karunakarswaero/" className="text-gray-400 hover:text-emerald-300 transition duration-200">Leetcode</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;