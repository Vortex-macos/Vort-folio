// Starfield Background
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const starsGeo = new THREE.BufferGeometry();
const count = 10000;
const pos = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 250;
starsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0x00ffea, size: 0.7 }));
scene.add(stars);

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Navbar: Smooth Scroll + CORRECT Active State (Home fixed!)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active from all
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // Add active to clicked one
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Update active link on scroll — ONLY Home when truly at top
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100; // offset for navbar height

  let current = '';

  // Check each section
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  // If we're at the very top → force Home
  if (window.scrollY < 100) {
    current = 'home';
  }

  // Apply active class
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').substring(1); // remove #
    link.classList.toggle('active', href === current);
  });

  // Navbar shrink effect
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.section').forEach(sec => {
  gsap.from(sec.children, {
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: { trigger: sec, start: "top 80%" }
  });
});