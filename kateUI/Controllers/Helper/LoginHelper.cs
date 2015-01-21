using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace EFSchools.Englishtown.Bella.CMS.UI.Controllers.Helper
{
    public static class LoginHelper
    {
        #region field
        private const string COOKIE_LOGIN_KEY = "login";
        private const string COOKIE_LOGINTYPE_KEY = "logintype";
        private static byte[] DESKEY = new byte[] { 0x70, 0x01, 0x02, 0x03, 0x04, 0x02, 0x06, 0xA1, 0x08, 0x09, 0xB2, 0x0B, 0x0C, 0xD0, 0x0E, 0x0F, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0xE2, 0xC1, 0x0F };
        private static byte[] DESIV = new byte[] { 0xA0, 0x01, 0x02, 0x0B, 0x04, 0x05, 0xF6, 0x07 };

        #endregion

        public static string GetBellaId(HttpRequestBase req)
        {
            var cookie = req.Cookies[COOKIE_LOGIN_KEY];
            if (cookie == null || string.IsNullOrEmpty(cookie.Value))
            {
                return string.Empty;
            }

            return DecryptString(cookie.Value, DESKEY, DESIV);
        }
        public static string GetLoginType(HttpRequestBase req)
        {
            var cookie = req.Cookies[COOKIE_LOGINTYPE_KEY];
            if (cookie == null || string.IsNullOrEmpty(cookie.Value))
            {
                return string.Empty;
            }

            return DecryptString(cookie.Value, DESKEY, DESIV);
        }
        
        public static void SetLoginInfo(HttpResponseBase rep, string bellaId, string loginType)
        {
            if (string.IsNullOrEmpty(bellaId))
            {
                return;
            }

            var val1 = EncryptString(bellaId, DESKEY, DESIV);
            var val2 = EncryptString(loginType, DESKEY, DESIV);

            rep.Cookies.Remove(COOKIE_LOGIN_KEY);
            rep.Cookies.Remove(COOKIE_LOGINTYPE_KEY);
            rep.Cookies.Add(new HttpCookie(COOKIE_LOGIN_KEY, val1));
            rep.Cookies.Add(new HttpCookie(COOKIE_LOGINTYPE_KEY, val2));
        }
        
        public static void ClearLoginCookie(HttpRequestBase req)
        {
            req.Cookies.Remove(COOKIE_LOGIN_KEY);
            req.Cookies.Remove(COOKIE_LOGINTYPE_KEY);
        }
        

        #region private
        private static string EncryptString(string plainText, byte[] Key, byte[] IV)
        {
            if (string.IsNullOrEmpty(plainText))
                throw new ArgumentNullException("plainText");
            if (Key == null || Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (IV == null || IV.Length <= 0)
                throw new ArgumentNullException("IV");
            
            byte[] encrypted;

            // Create an TripleDESCryptoServiceProvider object
            // with the specified key and IV.
            using (TripleDESCryptoServiceProvider tdsAlg = new TripleDESCryptoServiceProvider())
            {
                tdsAlg.Key = Key;
                tdsAlg.IV = IV;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform encryptor = tdsAlg.CreateEncryptor(tdsAlg.Key, tdsAlg.IV);

                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {

                            //Write all data to the stream.
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }

            return System.Convert.ToBase64String(encrypted);
        }

        private static string DecryptString(string str, byte[] Key, byte[] IV)
        {
            try
            {

                if (string.IsNullOrEmpty(str))
                    throw new ArgumentNullException("str");
                if (Key == null || Key.Length <= 0)
                    throw new ArgumentNullException("Key");
                if (IV == null || IV.Length <= 0)
                    throw new ArgumentNullException("IV");

                byte[] cipherText = System.Convert.FromBase64String(str);

                // Declare the string used to hold
                // the decrypted text.
                string plaintext = null;

                // Create an TripleDESCryptoServiceProvider object
                // with the specified key and IV.
                using (TripleDESCryptoServiceProvider tdsAlg = new TripleDESCryptoServiceProvider())
                {
                    tdsAlg.Key = Key;
                    tdsAlg.IV = IV;

                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = tdsAlg.CreateDecryptor(tdsAlg.Key, tdsAlg.IV);

                    // Create the streams used for decryption.
                    using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {

                                // Read the decrypted bytes from the decrypting stream
                                // and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }

                return plaintext;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        #endregion

    }
}