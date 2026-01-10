const BASE_URL = "http://localhost:5050/api/admin";


/* 📊 STATS */
export async function getStats() {
  const res = await fetch(`${BASE_URL}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

/* 📄 DOCUMENTS */
export async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
}

/* 🗑 DELETE */
export async function deleteDocument(filename) {
  const res = await fetch(
    `${BASE_URL}/documents/${encodeURIComponent(filename)}`,
    { method: "DELETE" }
  );

  if (!res.ok) throw new Error("Failed to delete document");
}

// export async function uploadDocument(file, onProgress) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     const formData = new FormData();

//     formData.append("file", file);

//     xhr.upload.onprogress = (e) => {
//       if (e.lengthComputable && onProgress) {
//         const percent = Math.round((e.loaded / e.total) * 100);
//         onProgress(percent);
//       }
//     };

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve();
//       } else if (xhr.status === 409) {
//         reject("Document already exists");
//       } else {
//         reject("Upload failed");
//       }
//     };

//     xhr.onerror = () => reject("Network error");

//     xhr.open("POST", "http://localhost:5050/api/upload");
//     xhr.send(formData);
//   });
// }

export function uploadDocument(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);

        if (xhr.status === 200) {
          resolve(res);
        } else {
          reject(res.error || "Upload failed");
        }
      } catch {
        reject("Upload failed");
      }
    };

    xhr.onerror = () => reject("Network error");

    xhr.open("POST", "http://localhost:5050/api/upload");
    xhr.send(formData);
  });
}




export function viewDocument(filename) {
  const url = `http://localhost:5050/api/admin/documents/view/${encodeURIComponent(filename)}`;
  window.open(url, "_blank"); // 👈 opens PDF in new tab
}


/* 📊 CHART DATA */
export async function getCharts() {
  const res = await fetch(`${BASE_URL}/charts`);
  if (!res.ok) throw new Error("Failed to fetch charts");
  return res.json();
}
