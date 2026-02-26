import { useEffect, useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir. 
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/

  const [comments, setComments] = useState(postData.comments);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!username && !comment){
      setErrorMessage("Tüm alanlar boş")
      return;
    }

    if (!comment) {
      setErrorMessage("Comment alanı boş");
      return;
    }
    if(!username){
      setErrorMessage("Username alanı boş");
      return;
    }

    setComments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        userName: username,
        isAnonymous: isCheck,
        commentText: comment,
      },
    ]);

    setUsername("");
    setComment("");
    setIsCheck(false);
    setErrorMessage("");
  };
  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adı girin."
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isCheck}
            onChange={(e) => setIsCheck(e.target.checked)}
          />
          İsimsiz mi göndereyim?
        </label>
        <button>Gönder</button>
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
}
