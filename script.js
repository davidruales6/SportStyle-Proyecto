// --- ESTADO Y DATOS PROTEGIDOS ---
let currentUser = null; 

const protectedComments = [
    { user: "Ana Lucía", text: "Me encanta el estilo de David Ruales Sport.", date: "02/05/2026", protected: true },
    { user: "David Ruales", text: "Muy buenos productos", date: "02/05/2026", protected: true }
];

const pages = {
    inicio: `
        <header class="hero text-center text-white">
            <div class="container">
                <h1 class="display-3 fw-bold">DOMINA EL <span class="text-warning">JUEGO</span></h1>
                <p class="lead">Equipamiento de alto rendimiento para atletas de élite.</p>
                <button class="btn btn-main mt-3" onclick="loadPage('productos')">VER CATÁLOGOS</button>
            </div>
        </header>
        <section class="container my-5">
            <h2 class="text-center mb-5 fw-bold text-uppercase">Categorías Principales</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="position-relative overflow-hidden shadow rounded" style="height: 300px;">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" class="w-100 h-100 object-fit-cover" alt="Calzado">
                        <div class="position-absolute bottom-0 start-0 p-3 bg-dark text-white w-100 bg-opacity-75 fw-bold text-uppercase">Calzado Técnico</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="position-relative overflow-hidden shadow rounded" style="height: 300px;">
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600" class="w-100 h-100 object-fit-cover" alt="Ropa">
                        <div class="position-absolute bottom-0 start-0 p-3 bg-dark text-white w-100 bg-opacity-75 fw-bold text-uppercase">Ropa Deportiva</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="position-relative overflow-hidden shadow rounded" style="height: 300px;">
                        <!-- LINK CORREGIDO AQUÍ -->
                        <img src="https://suplementosalmayor.cl/wp-content/uploads/2025/04/nitro-gold-creatine-drive.png" class="w-100 h-100 object-fit-cover" alt="Suplementos">
                        <div class="position-absolute bottom-0 start-0 p-3 bg-dark text-white w-100 bg-opacity-75 fw-bold text-uppercase">Suplementación</div>
                    </div>
                </div>
            </div>
        </section>
    `,
    productos: `
        <div class="container my-5">
            <h2 class="text-uppercase fw-bold mb-4 border-start border-warning border-5 ps-3">Catálogos Especializados</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <!-- LOS 9 CATÁLOGOS EN CUADRÍCULA -->
                ${renderCategoryCard('Calzado Pro', 'Zapatillas de alta gama', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'cat_calzado')}
                ${renderCategoryCard('Indumentaria EC', 'Camisetas y ropa oficial', 'https://m.media-amazon.com/images/I/71WXwCbm86L._AC_SX679_.jpg', 'cat_ropa')}
                ${renderCategoryCard('Equipaje y Viaje', 'Mochilas y maletines', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'cat_mochilas')}
                ${renderCategoryCard('Suplementación Elite', 'Proteína, Creatina y más', 'https://bodyfitsupplements.com.mx/cdn/shop/files/PAQUETEON_CREATINAMETA.png?v=1707152677', 'cat_suplementos')}
                ${renderCategoryCard('Protección Deportiva', 'Guantes y Straps', 'https://m.media-amazon.com/images/I/717AfpXKDbL._AC_SX569_.jpg', 'cat_proteccion')}
                ${renderCategoryCard('Repuestos Gym', 'Cables y Poleas', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'cat_repuestos')}
                ${renderCategoryCard('Suelos e Instalación', 'Césped Sintético y Caucho', 'data:image/jpeg;base64,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', 'cat_suelo')}
                ${renderCategoryCard('Estructuras Técnicas', 'Postes y Racks', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400', 'cat_postes')}
                ${renderCategoryCard('Espejos y Estética', 'Espejos de alta definición', 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400', 'cat_espejos')}
            </div>
        </div>
    `,
    // --- CONTENIDOS DE LOS CATÁLOGOS ---
    cat_calzado: `
        <div class="container my-5">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Calzado Pro</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Zapatilla Speed Pro', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400')}
                ${renderProduct('Bota Crossfit Ultra', 110.00, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400')}
            </div>
        </div>`,
    cat_ropa: `
        <div class="container my-5">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Indumentaria EC</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Camiseta Oficial EC', 64.90, 'https://m.media-amazon.com/images/I/71WXwCbm86L._AC_SX679_.jpg')}
                ${renderProduct('Short de Compresión', 29.99, 'https://images-na.ssl-images-amazon.com/images/I/617EdaA05zL._AC_UL600_SR600,600_.jpg')}
            </div>
        </div>`,
    cat_mochilas: `
        <div class="container my-5">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Equipaje y Viaje</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Mochila Training', 45.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400')}
                ${renderProduct('Bolso de Gimnasio XL', 55.00, 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/6a10d7423c7475f2f082b217ed345285.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp')}
            </div>
        </div>`,
    cat_suplementos: `
        <div class="container my-5">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Suplementación Elite</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Whey Protein Gold', 75.00, 'https://syf.ec/img/p/1/0/1/0/1010.jpg')}
                ${renderProduct('Creatina Micronizada', 32.50, 'https://syf.ec/1135-thickbox_default/creatina-micronizada-optimum-nutrition.jpg')}
            </div>
        </div>`,
    cat_proteccion: `
        <div class="container my-5 text-dark">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Protección Deportiva</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Guantes Grip-Pro', 25.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQccfBz1kQUUwMqZoQa5IHj2mmmzMvwfCFFHg&s')}
                ${renderProduct('Cinturón de Levantamiento', 45.00, 'https://move.boost.ec/wp-content/uploads/2024/07/FAJA-DE-LEVANTAMIENTO.jpg')}
            </div>
        </div>`,
    cat_repuestos: `
        <div class="container my-5 text-dark">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Repuestos Gym</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Cable de Acero (Metro)', 8.00, 'https://acdn-us.mitiendanube.com/stores/005/174/968/products/cable-acero-1-a074875b7862a5ee8217272765981684-1024-1024.webp')}
                ${renderProduct('Polea de Reemplazo', 15.00, 'https://http2.mlstatic.com/D_NQ_NP_756889-CBT78032602738_082024-O.webp')}
            </div>
        </div>`,
    cat_suelo: `
        <div class="container my-5 text-dark">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Suelos e Instalación</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Césped Sintético (m2)', 18.00, 'https://image.made-in-china.com/2f0j00tAroMGvJLgqy/High-Performance-UV-Proof-Artificial-Grass-Turf-for-Indoor-Outdoor-Area.jpg')}
                ${renderProduct('Piso de Caucho Impacto', 22.00, 'https://http2.mlstatic.com/D_NQ_NP_926873-MEC101920169269_122025-O.webp')}
            </div>
        </div>`,
    cat_postes: `
        <div class="container my-5 text-dark">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Estructuras Técnicas</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Poste Multifuncional', 120.00, 'https://product-media.cdn.t1.com/product-channel/62189/2026/1/16/4eef6e5e616d0a8d18736914cf219aab.jpg')}
                ${renderProduct('Power Rack Pro', 550.00, 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400')}
            </div>
        </div>`,
    cat_espejos: `
        <div class="container my-5 text-dark">
            <button class="btn btn-sm btn-dark mb-4 rounded-0" onclick="loadPage('productos')">← VOLVER</button>
            <h2 class="fw-bold text-uppercase mb-4">Espejos y Estética</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${renderProduct('Espejo de Seguridad 2m', 150.00, 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400')}
                ${renderProduct('Espejo con Marco Reforzado', 185.00, 'https://m.media-amazon.com/images/I/816ghe1FfuL._AC_UF894,1000_QL80_.jpg')}
            </div>
        </div>`,
    nosotros: `
        <div class="container my-5 py-5">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <h2 class="display-5 fw-bold text-center mb-5 text-uppercase">Trayectoria Académica y Visión Profesional</h2>
                    <div class="bg-light p-5 shadow-sm rounded border-start border-warning border-5">
                        <p class="fs-5 mb-4 text-dark" style="text-align: justify; line-height: 1.8;">
                            En calidad de estudiante de segundo semestre de la carrera de <strong>Desarrollo de Software en el Universitario Japón</strong>, he iniciado el proyecto <em>SportStyle</em> como una respuesta técnica a la necesidad de recursos deportivos accesibles y confiables en el contexto nacional. Esta plataforma representa un laboratorio de innovación donde convergen el aprendizaje académico y la implementación práctica de soluciones digitales.
                        </p>
                        <p class="fs-5 mb-4 text-dark" style="text-align: justify; line-height: 1.8;">
                            Actualmente, mi desarrollo profesional se fundamenta en la adquisición de competencias en diversos lenguajes y marcos de trabajo, tales como <strong>Java, Python y Laravel</strong>. Aunque el sistema se encuentra en una etapa de desarrollo continuo, el enfoque primordial es la construcción de una arquitectura robusta que garantice la seguridad y la integridad de la experiencia del usuario.
                        </p>
                        <p class="fs-5 mb-0 text-dark" style="text-align: justify; line-height: 1.8;">
                            A futuro, proyecto mi carrera hacia la especialización como <strong>desarrollador integral y creador de videojuegos</strong>. Esta ambición académica y profesional busca integrar la lógica de programación avanzada con la creatividad del diseño interactivo, contribuyendo así al crecimiento del ecosistema tecnológico en Ecuador.
                        </p>
                    </div>
                    <div class="mt-5 text-center">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000" class="img-fluid shadow-lg rounded" alt="Laboratorio de Desarrollo SportStyle">
                        <p class="fst-italic mt-2 text-muted" style="font-size: 0.9rem;">Figura 1. Representación del entorno de innovación deportiva. Elaboración propia (2026).</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    contacto: `
        <div class="container my-5 text-dark">
            <div class="row justify-content-center">
                <div class="col-md-6 shadow-lg p-5 rounded border-top border-warning border-5 bg-white">
                    <h2 class="text-center mb-4 fw-bold text-uppercase">CONTÁCTANOS</h2>
                    <form id="contactForm">
                        <div class="mb-3"><input type="text" class="form-control" placeholder="Nombre completo"></div>
                        <div class="mb-3"><input type="email" class="form-control" placeholder="Correo electrónico"></div>
                        <div class="mb-3"><textarea class="form-control" rows="4" placeholder="Mensaje"></textarea></div>
                        <button type="button" class="btn btn-main w-100">ENVIAR CONSULTA</button>
                    </form>
                </div>
            </div>
            <div class="mt-5">
                <h3 class="fw-bold text-uppercase mb-3">Comentarios</h3>
                <button class="btn btn-outline-warning text-black fw-bold mb-4 rounded-0" onclick="openCommentModal()">
                    AGREGAR COMENTARIO +
                </button>
                <div id="comments-list" class="row g-3 pb-5"></div>
            </div>
        </div>
    `
};

// --- FUNCIONES CORE ---

function renderCategoryCard(title, subtitle, img, targetPage) {
    return `
        <div class="col">
            <div class="card h-100 border-0 shadow-sm category-card overflow-hidden" 
                 style="cursor: pointer; transition: 0.3s;" 
                 onclick="loadPage('${targetPage}')">
                <img src="${img}" class="card-img-top object-fit-cover" alt="${title}" style="height: 200px;">
                <div class="card-body bg-dark text-white text-center">
                    <h5 class="fw-bold text-warning mb-1">${title}</h5>
                    <p class="small mb-0 opacity-75">${subtitle}</p>
                </div>
            </div>
        </div>`;
}

function renderProduct(name, price, img) {
    return `
        <div class="col">
            <div class="card h-100 product-card shadow-sm border-0 text-dark bg-white">
                <img src="${img}" class="card-img-top p-4 object-fit-cover" alt="${name}" style="height: 250px;">
                <div class="card-body text-center">
                    <h5 class="fw-bold">${name}</h5>
                    <p class="text-warning fw-bold fs-4">$${price.toFixed(2)}</p>
                    <button class="btn btn-dark btn-sm rounded-0 px-4">AGREGAR</button>
                </div>
            </div>
        </div>
    `;
}

function loadPage(pageKey) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = pages[pageKey];
    window.scrollTo(0, 0);
    if (pageKey === 'contacto') renderComments();
}

// --- COMENTARIOS ---

function getSavedComments() {
    const stored = localStorage.getItem('sportStyleComments');
    return stored ? JSON.parse(stored) : [];
}

function renderComments() {
    const list = document.getElementById('comments-list');
    if (!list) return;
    const userComments = getSavedComments();
    const allComments = [...protectedComments, ...userComments];

    list.innerHTML = allComments.map((c, i) => {
        const isProtected = i < protectedComments.length;
        return `
        <div class="col-12">
            <div class="p-3 border border-warning bg-white d-flex justify-content-between align-items-center shadow-sm text-dark">
                <div>
                    <strong class="text-warning text-uppercase" style="font-size:0.8rem;">${c.user}:</strong> 
                    <span class="ms-2">${c.text}</span>
                </div>
                ${!isProtected ? `
                <div>
                    <button class="btn btn-sm btn-dark rounded-0" onclick="openCommentModal(${i})">EDITAR</button>
                    <button class="btn btn-sm btn-danger rounded-0" onclick="deleteComment(${i})">X</button>
                </div>` : ''}
            </div>
        </div>`;
    }).join('');
}

function openCommentModal(index = -1) {
    const modalElement = document.getElementById('commentModal');
    const modal = new bootstrap.Modal(modalElement);
    const userComments = getSavedComments();
    const allComments = [...protectedComments, ...userComments];

    if (index > -1) {
        document.getElementById('modal-name').value = allComments[index].user;
        document.getElementById('modal-text').value = allComments[index].text;
        document.getElementById('editIndex').value = index;
    } else {
        document.getElementById('modal-name').value = "";
        document.getElementById('modal-text').value = "";
        document.getElementById('editIndex').value = -1;
    }
    modal.show();
}

function saveComment() {
    const name = document.getElementById('modal-name').value;
    const text = document.getElementById('modal-text').value;
    const index = parseInt(document.getElementById('editIndex').value);
    let userComments = getSavedComments();

    if (name && text) {
        if (index >= protectedComments.length) {
            userComments[index - protectedComments.length] = { user: name, text: text };
        } else if (index === -1) {
            userComments.push({ user: name, text: text });
        }
        localStorage.setItem('sportStyleComments', JSON.stringify(userComments));
        bootstrap.Modal.getInstance(document.getElementById('commentModal')).hide();
        renderComments();
    }
}

function deleteComment(index) {
    let userComments = getSavedComments();
    userComments.splice(index - protectedComments.length, 1);
    localStorage.setItem('sportStyleComments', JSON.stringify(userComments));
    renderComments();
}

window.onload = () => loadPage('inicio');