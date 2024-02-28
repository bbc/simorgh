# Media Player

## Description

This component loads a media player into our webpage. It uses the BBC Universal Media Player module (BUMP) to choose the correct the Embedded Media Player (EMP) for the user's device. Using BUMP removes considerations towards variations in user device and web-browsers as BUMP handles this logic for us and provides the best fitting EMP for our webpage. For example, BUMP can cater for differences between mobiles, laptops and desktops, but also factors such as whether the user is using network data (3G) or a WIFI. 


## Local Development
So that the EMP can load video data, our localhost's domain name should be altered from `localhost:7080` to `localhost.bbc.com:7080` to fully encorporate the bbc domain name (bbc) and top-level domain (.com).

To do, run the command: 

`sudo -- sh -c -e "echo '127.0.0.1       localhost.bbc.com' >> /etc/hosts";`

Then, access local pages using: `localhost.bbc.com:7080/`, 
eg.
Express pages:  `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko`

Next pages: `http://localhost.bbc.com:7081/pidgin/live/c7p765ynk9qt?renderer_env=test`


Currently, the EMP is set to only load Live video assets by default. To load test assets, append the query `?renderer_env=test` to the url. Eg.  `http://localhost.bbc.com:7080/afaanoromoo/articles/c4g19kgl85ko?renderer_env=test`
