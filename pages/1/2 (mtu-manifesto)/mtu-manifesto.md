
# Content Sacrificed to Time Constraints

04\-Feb\-2025


---


# Nested Encapsulation

![](img/MTU-v8_0.png)

Ethernet \(frames\)


---


# IP / Ethernet



* IP and Ethernet are both  _message oriented_  protocols
  * Nothing  _in_  a message is valid until you’re sure that the message has ended
* IP and Ethernet both have innate limits on the  _size_  of message that they can transmit
  * IP datagram maximum size: 65535 bytes
  * Ethernet frame maximum size: \(roughly\) 11455 bytes

---




# IP / Ethernet Encapsulation

Payload \(0\-1440 bytes\)

Headers \(20\-60 bytes\)

Headers \(18 bytes\)

Payload \(46\-1500 bytes\)


---


# Ethernet Jumbo Frames



* What  _are_  they?
  * Ethernet frames without the 1500\-byte payload limit\.
  * No standards defined

---




# Ethernet Jumbo Frames (3)

| Advantages | Disadvantages |
| :-: | :-: |
| __Increased throughput__ | __Increased latency__ |
| __Decreased CPU utilization__ | __Increased queue requirements__ |
| __Key enabler for IP\-storage__ | __Need end\-to\-end enablement__ |
| __Fix __  _so_  __ many problems__ | __Cause __  _so_  __ many problems__ |


---


# IP / Jumbo-Ethernet Encapsulation

Payload \(0\- __        __     bytes\)

Headers \(20\-60 bytes\)

Headers \(18 bytes\)

Payload \(46\-           bytes\)


---


# PMTUD: Why?

The lowest  _interface_  MTU on the entire  _path_  between two IP endpoints is the  _path_  MTU \(aka “effective MUT”\)\.

We  _want_  an IP interface to be able to discover and maintain  _path\-MTU_  information for cases when the  _path\-MTU_  is lower than the interface MTU\.


---


# PMTUD: RFC1191

Oldest\, most abundant PMTUD mechanism

Operates  _exclusively _ in the IP and ICMP layers

Requires  _every_  IP gateway in the path to do  its part

Results in explicit/correct PMTU value


---


# PMTUD: RFC4821 / PLPMTUD

Executed exclusively on the endpoints

Operates at the packetization layer \(e\.g\.\. TCP\)

_Infers_  path MTU based on the size of packets sent but not ACKed

Implies the need for a path information cache at the IP layer


---


# PMTUD: RFC8899 / DPLPMTUD

Defines a pattern for  _applications_  using datagram transport protocols \(e\.g\. UDP\) implement PLPMTUD\.

Has to be implemented  _in the application_


---


# PMTUD: Recap

|  | Layer of Operation | Must run on? | Notes |
| :-: | :-: | :-: | :-: |
| RFC1191 | IP/ICMP | _All_  senders and  _all_  gateways | Best juice:squeeze ratio on endpoints\. |
| RFC4821 | Packetization \(e\.g\.\. TCP\) | Endpoints only\, but  _all_  packetization\-layer Ifs | Basically solves PMTUD for all TCP |
| RFC8899 | Application \(e\.g\.\. SCTP\) | Endpoints only\, but  _all _ applications\. | Per\-application implementation is a big ask |


---


# Ethernet Jumbo Frames



* Ethernet uses CRC32 for error\-detection
  * Probability of missed\-errors increases sharply above 11\,455\-byte frame\-length
* 8400 bytes of payload was regarded as a bit of a magic number
* Ethernet headers keep getting bigger
