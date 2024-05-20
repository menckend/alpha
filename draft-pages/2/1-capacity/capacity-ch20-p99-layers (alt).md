---
libname: Articles
docname: -DRAFT- Abstracting Capacity
chapnum: 20
chapnam: "Foundations"
pagenum: 20
title: Multi-layered Architecture Model
summary: "Layared archiectures are a recurring them in information technology. We need a consistent way to talk about how that layering works if we're going to look at how it relates to capacity."
permalink: capacity_ch20_p2.html
folder: articles\/capacity
---

{% capture details %}
The idea of a layered-model is foundational in information technology, but is worth elaborating on briefly with regards to IT systems architecture.

{% capture details %}
I haven't been able to locate any single authoritative reference for what a "layered architecture" is, but there are a few themese that seem to be pretty ubiquitous:

#### Properties of Layers

* Layers are groupings of elements with similar functionality.
    * Typically depicted as horizontal bands in graphical representations.
* Layers are arranged hierarchically
    * With the hierarchical relationships depicted through vertical positioning in graphical representations
* Information moves between adjacent layers only

#### Benefits of Layered architectures

* Well-implemented layered architectures allow for modular refit of system elements.
    * An MS SQLServer instance acting as an element in a "database layer" could be be replaced with a PostGRESQL, for instance
* Provide an abstracted, functional-level view of overall system architecure
{% endcapture %}
{% capture summary %}### Conventional Description {% endcapture %}{% include details.html %}

{% capture details %}
I will use the following conventions with regards to conceptual layers of IT systems architecture throughout this document:

* Layers are designated with both an index number and a name
* Layers are hierarchical
* For any two "adjacent" layers in an architecture stack, the *lower* of the two layers is considered to be (the "hosting" layer), which *hosts* the upper of the two layers (the "<em>workload</em>" layer).
    * Conversely, the workload layer is hosted on the hosting layer.
* The hosting layer exposes (provides) "functions" to the workload layer through its "interfaces", consuming "capacity" as it does so.
    * A "function" is something that the hosting layer can *do* for the workload layer
    * An "interface" is an implementation of a well-defined mechanism through which the hosting and workload layers connect/communicate
        * The hosting layer has an "up-facing" interface that presents to the workload layer
    * "Capacity" is the set of internal resources that the hosting layer consumes in executing functions for the workload layer
* The workload layer
    * Accesses/requests/receives the hosting layer's "functions" through the hosting layer's "interface"
        * To do so, the workload layer must implement its own "down-facing" interface, using the same well-define mechanism as the "up-facing" interface of the hosting layer.
{% endcapture %}
{% capture summary %}### But, for *this* discussion... {% endcapture %}{% include details.html %}
{% endcapture %}
{% capture summary %}## Let's Talk About Layers{% endcapture %}{% include details.html %}

{% capture details %}
Here are a couple of  ubiquitous layered-models that crop up in IT systems architecture:

{% capture details %}
OK, maybe a bit *too* on the nose, given my background, but it's certainly ubiquitous. In the TCP/IP architecture, the "IP" and "transport" layers are adjacent to each other. More than a few systems in the real world implement the "IP layer" using the IPv4 protocol specification, and the "transport" layer using the TCP protocol specification.

In a common scenario (any random Linux host), the lower-layer ("IP") function/role is instantiated as software (implementing the functions defined in the IPv4 protocol standard) running as part of Linux kernel. The upper-layer ("transport") is instantiated the same way, substituting the TCP protocol (instead of the IP protocol). In that scenario, we have our two ostensible "layers" instantiated as logic being executed in kernel-space.

So, we have our two nominal layers, but how do we make sense of them relative to the framework I laid out in the previous section? Well... the network (IP) layer is the "hosting" layer and:

* It exposes two "functions" to the workload (transport/TCP) layer
    * SEND
    * RECV
* The "interface" it exposes those functions through is platform dependent
    * In a Linux operating system, for instance, [the "interface" is a large number of kernel functions](https://web.archive.org/web/20170905131225if_/https://wiki.linuxfoundation.org/images/1/1c/Network_data_flow_through_kernel.png).
* The "capacity" that it consumes includes host CPU cycles and throughput provided by the data-link layer (a layer down)

The "workload" layer is the transport (TCP) layer and:

* It consumes the SEND/RECV functions from the hosting (IP) layer
    * Using linux kernel function calls as its down-facing interface to the network layer

#### How the TCP/IP stack stacks up

Much as it pains me to say so, the TCP/IP stack, or the transport/network layers at least (as implemented in the Linux kernel, anyway) misses the boat on a lot of the typical characteristics/goals of a layered architecture. Specifically:

* Communication isn't limited to adjacent layers
    * The "application" layer can bypass the transport layer and access the "network" layer directly
* The transport and network layers suffer from extremely rigid coupling
    * They are both implemented as a set of in-kernel functions. (Not exactly plug-and-play if you wanted to swap out a different implementation of the TCP protocol.)

That's *not* to say that there's something *wrong* with TCP/IP (or even how it's implemented in the Linux kernel). Rather, the key takeaway here is that even if we have a conceptual model that defines a layered architecture, we can easily end up with a monolithic system, depending on *how* that model gets implemented.
{% endcapture %}
{% capture summary %}### The TCP/IP Stack{% endcapture %}{% include details.html %}

{% capture details %}
Computers. Who *doesn't* love, 'em? And they've got layers too!

#### Physical resources (Layer 1)

CPU, working-memory, non-volatile storage (etc...)


<details markdown=block>
<summary markdown=span>
#### BIOS (Layer 2)
</summary>
All about BIOS.  (More to come.)
</details>
The name (Basic Input-Output System) says it all

#### Operating System (Layer 3)

...

#### Application (Layer 4)

...
{% endcapture %}
{% capture summary %}### Utility Compute{% endcapture %}{% include details.html %}
{% endcapture %}
{% capture summary %}## Examples of Layered Architecture Models{% endcapture %}{% include details.html %}
{% include links.html %}