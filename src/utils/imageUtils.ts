/**
 * Image and Avatar utility functions for SehatAI Pakistan
 * Provides fail-safe inline SVG data URIs for doctor profile pictures and AI avatars
 * to guarantee 100% reliable rendering on GitHub Pages, Vercel, and all network environments.
 */

export const getDoctorAvatarFallback = (name: string): string => {
  const initials = name
    .replace(/^(Dr\.|Doctor|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
    .trim()
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DR';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <rect width="128" height="128" rx="28" fill="#0f766e"/>
    <circle cx="64" cy="46" r="22" fill="#14b8a6" opacity="0.9"/>
    <path d="M28 104c0-20 16-32 36-32s36 12 36 32" fill="#14b8a6" opacity="0.9"/>
    <text x="64" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getBase64Image = (imgUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!imgUrl) {
      resolve(getDoctorAvatarFallback('Dr. Sehat AI'));
      return;
    }
    if (imgUrl.startsWith('data:')) {
      resolve(imgUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 128;
        canvas.height = img.naturalHeight || img.height || 128;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.9);
          resolve(dataURL);
          return;
        }
      } catch (e) {
        console.warn('Canvas conversion failed, fallbacking:', e);
      }
      resolve(getDoctorAvatarFallback('Dr. Sehat AI'));
    };
    img.onerror = () => {
      resolve(getDoctorAvatarFallback('Dr. Sehat AI'));
    };
    img.src = imgUrl;
  });
};
