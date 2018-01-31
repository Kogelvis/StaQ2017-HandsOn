# Security

* Wifi: StaQ-Security - Staq-2017

* VM: ssh root@localhost:17022
* Username: root
* Password: crashoverride

* http://localhost:17080
<!-- .slide: data-state="somestate" -->
<!-- .slide: data-background-image="images/cover.gif" data-background-position="bottom" -->
<canvas id="smoke" class="smoke"></canvas>

---

## Verify results

You can verify the result of your efforts by running:
`/root/staq_check`

---

## Assignment 1
This program looks up the entered value in a file named dictionary.txt. The implementation however is extreme susceptible for "command-injection" (otherwise known as OS-injection). Change the program in a way this isn't possible anymore.
You can find the program in `/var/www/html/level1`

--

## first hint
You can separate commands in linux using a `;`

--

## second hint
As an example, search for `"a; cat /etc/passwd"` (without the quotes).

---

## Assignment 2
This page contains an SQL-injection leak. This makes it very easy to circumvent the login-page.
Modify the code to prevent this.

Username for level 2 is `"level2"` without the quotes.

--

## first hint
An example was given during the presentation.

--

## second hint
Try and use `" or "1"="1` as password.

---

## Assignment 3
This level has a modified 404 page, it is vulnerable for a XSS (Cross Site Scripting) attack. Modify the code to prevent this.

--

## first hint
Visit the modified 404 page (http://yourhost/level3/idontexist)

--

## second hint
Maybe you can provide a javascript alert in the address-bar?

--

## third hint
For example `http://yourhost/level3/idontexist<script>alert('hello');</script>`

---

## Assignment 4
Though it is often disabled, SELinux or its counterpart AppArmor provide hardening within the operating system.
SELinux is currently disabled on our demo system. If it were enabled the http daemon would still be allowed to 
connect to other network-services.
You can check this by browsing to http://yourhost/proxypass/

Try enabling SELinux and find the setting to disable the http daemon connecting to other network services.
If you do this correctly then you wouldn't see `Nee!` anymore on the aforementioned link.

--

## first hint
Using `getenforce` you can see the current SELinux status.
Maybe you can "set" another value?

--

## second hint
Using `getsebool` you can view various settings of SELinux.

--

## third hint
Like `httpd_can_network_connect`

---

## Assignment 5
Even though SSH is one of the more secure ways to connect to a remote server, there are still some bad configuration choices to be made. The SSH daemon has been badly configured. Ideally you'd want to connect using an ssh-key. But if you need to permit password-based authentication then at least make sure that a certain user can't...

--

## first hint
Which users are permitted to log-in? 

--

## second hint
Should the `root` user be able to connect remotely?

---

## Assignment 6
Even though telnet is a very outdated and insecure application it still has its use for some specific solutions.
Telnet is enabled on our demo-system. Disable it without deleting/uninstalling the package itself.

--

## first hint
How is telnet started on this system?

--

## second hint
Hint: xinetd

--

## third hint
Configuration is usually found in the `/etc` directory (or a subdirectory thereof.

---

## Assignment 7
It's good practice to have a local firewall on every system. Make sure you have a working firewall on your demo system.
Be sure not to lock yourself out :)

--

## first hint
The firewall is created and managed with `iptables`

--

## second hint
Make sure you permit at least SSH traffic (port 22) for yourself.

--

## third hint
REJECT or DROP all traffic after permitting legitimate traffic on the INPUT and FORWARD chains.

--

## fourth hint
Is iptables automatically started on runlevel 3?

--

## fifth hint
This is checked and managed by the `chkconfig` program.

---

## Assignment 8
Our demo system is a bit outdated. It contains some vulnerabilities you'd like to get rid of. Amongst others it is vulnerable for the shellshock and dirty-cow vulnerabilities. Make sure these can't be used anymore.

--

## first hint
Are there any available updates for this system?

--

## second hint
You can check this using `yum list updates`

---

## Assignment 9 
The http daemon has an old and crude ssl configuration. You'd like to improve this configuration. Use the `/root/testssl.sh` script to test your setup and see if you can achieve the following objectives:
- Disable SSLv3
- Disable Low, Medium en DES ciphers
- Solve the RC4, POODLE en Heartbleed vulnerabilities

--

## first hint
You will find the configuration for the http daemon in `/etc/httpd`

--

## second hint
In one of the subdirectories you will find a file called ssl.conf

--

## third hint
Using `-` en `!` help with disabling settings

---

## Assignment 10
The `sudo` program is often used to give users limited super-user rights on a linux system. If you're not careful a user can quickly obtain too many rights. The user `quintor` has some specific rights, however the setup contains some "leaks" discover these and try to understand why this is a risk.

--

## first hint
The config for sudo can be found in `/etc/sudoers.d`

--

## second hint
The user `quintor` is allowed to run a `whoami` program

--

## third hint
Who is the owner of this file?

--

## fourth hint
Which rights have been assigned to this file?

---

## Assignment 11
Like assignment 10 there are more commands the user `quintor` is allowed to run.

--

## first hint
The user `quintor` can also run a bunch of `print*` commands.

--

## second hint
Which rights have been assigned to these commands?

--

## third hint
And how are the rights on the folder?

---

## Assignment 12
The user `quintor` is allowed to configure and control apache. It is possible to obtain root rights with this configuration. Try to discover and understand how this is possible and prevent it. 

--

## first hint
Which config would the user be able to change?

--

## second hint
Perhaps this is a rights problem as well?
