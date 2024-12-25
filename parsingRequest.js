const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Taking input from user</title></head>");
    res.write("<body><h1>Welcome to User Input Form</h1>");
    res.write('<form action="/submit-details"" method="POST">');
    res.write(
      '<input type="text" name="name" id="name" placeholder="Enter your Name"/><br></br>'
    );
    res.write('<label for="gender">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"/>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="Female" name="gender" value="Female"/>');
    res.write('<label for="Female">Female</label><br></br>');
    res.write('<input type="submit" value="submit"/>');

    res.write("</form>");
    res.write(" </body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    // getting chunks of data from cliend
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk); //pushing chunk into array
    });

    //conver chunks to buffer to make sequence of data befor processing
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);

      //parsing data from buffer
      const params = new URLSearchParams(fullBody); // URlSearchParams = decode the encoded data

      //   const obj = {};
      //   //distributing parameters into key value pairs
      //   for (const [key, value] of params.entries()) {
      //     obj[key] = value;
      //   }

      //another simple way to distribute parameters into key value pairs
      const obj = Object.fromEntries(params);
      console.log(obj);
      //this blocks tho whole loop so dont use this type except if important
      // fs.writeFileSync("user.txt", JSON.stringify(obj)); // writing users input into file.

      //Go with this
      fs.writeFile("user.txt", JSON.stringify(obj), (error) => {
        console.log(obj);
        res.statusCode = 302;
        res.setHeader("Location", "/"); //used to redirect user to another location
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1> page does not found</h1>");
    res.write('<a href="/">Go to Home</a>');
    res.end();
  }
};

module.exports = userRequestHandler;
