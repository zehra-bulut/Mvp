
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCareerAdvice(answers: string[]) {
  const prompt = `Based on these personality quiz responses: "${answers.join(', ')}", provide a personalized career analysis. 
  Include: 
  1. Top 3 recommended careers.
  2. Core personality strengths.
  3. Potential sectors for success.
  Keep it in Turkish as the platform is in Turkish.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.";
  }
}

export async function getSectorCompatibility(sectorName: string, personalityResult: string) {
  const prompt = `
    Kullanıcının kişilik analiz sonucu: "${personalityResult}"
    İncelenen Sektör: "${sectorName}"
    
    Lütfen bu sektörün kullanıcının kişilik özellikleriyle ne kadar uyumlu olduğunu analiz et.
    Cevabının İLK SATIRI mutlaka şu formatta olsun: "UYUM_ORANI: %[Sayı]" (Örn: UYUM_ORANI: %85)
    
    Ardından şu detayları ekle:
    1. Güçlü Yönlerin Uyumu: Kullanıcının hangi özellikleri bu sektörde avantaj sağlar?
    2. Potansiyel Zorluklar: Hangi alanlarda gelişim gerekebilir?
    3. Tavsiye: Sektöre giriş için ilk adım ne olmalı?
    
    Dili profesyonel, analitik ve cesaretlendirici tut. Türkçe cevap ver.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error("Compatibility Analysis Error:", error);
    return "Sektör uyumluluk analizi şu an yapılamıyor.";
  }
}

export async function getSectorBrief(sectorName: string, personalityResult: string) {
  const prompt = `
    Kullanıcının kişilik analiz sonucu: "${personalityResult}"
    İncelenen Sektör: "${sectorName}"
    
    Lütfen bu meslek için bir özet analiz yap.
    Format şu şekilde olmalı:
    GÜÇLÜ_YÖNLER: [3 madde halinde kullanıcının bu mesleğe uygun güçlü yanları]
    ZORLUKLAR: [2 madde halinde kullanıcının yaşayabileceği zorluklar]
    ÖZET: [1-2 cümlelik motivasyonel özet]
    
    Dili samimi ama profesyonel tut. Türkçe cevap ver.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error("Brief Analysis Error:", error);
    return "Analiz özeti şu an oluşturulamıyor.";
  }
}

export async function getCareerRoadmap(goal: string, currentStatus: string) {
  const prompt = `
    Kullanıcının Hedefi: "${goal}"
    Kullanıcının Şu Anki Durumu/Sınıfı: "${currentStatus}"
    
    Lütfen bu hedefe ulaşmak için kapsamlı, adım adım bir yol haritası (roadmap) oluştur. 
    Lütfen Google Search kullanarak güncel kabul şartlarını, burs imkanlarını ve gerekli yetkinlikleri araştır.
    
    Yol haritası şunları içermeli:
    1. Akademik Gereklilikler (Not ortalaması, sınavlar vb.)
    2. Sertifika ve Dış Kaynaklar (Hangi kurslar, hangi diller?)
    3. Sosyal ve Gönüllülük Faaliyetleri (CV'yi ne parlatır?)
    4. Zaman Çizelgesi (Sınıf seviyesine göre ne zaman ne yapılmalı?)
    
    Cevabı Markdown formatında, profesyonel ve motive edici bir dille Türkçe olarak ver.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Pro model for complex reasoning and search
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    return "Yol haritası oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.";
  }
}
